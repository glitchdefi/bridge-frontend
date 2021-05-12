import Web3 from "web3";
import window from "global";
import erc20Abi from "../contracts/erc20.abi";
import ethSwapAbi from "../contracts/ETHSwapAgent.json";
import bscSwapAbi from "../contracts/BSCSwapAgent.json";
import { calculateBalanceSend, } from "./utils";
import {helpers} from './helpers'

import { BigNumber } from "bignumber.js";
import exactMath from 'exact-math';
import { CHAIN_ID } from "../constants";
import {
  BLOCKCHAIN_NETWORK,
  BSC_GLITCH_ADDRESS,
  ETH_GLITCH_ADDRESS,
  BSC_BRIDGE_CONTRACT_ADDRESS,
  ETH_BRIDGE_CONTRACT_ADDRESS,
} from "../_configs";
import { CHAIN_IDS } from "../constants";

import { extensionName } from "../constants/values";

// //console.log(BLOCKCHAIN_NETWORK);
export default class WalletExtensionUtils {
  constructor(ex) {
    this.web3 = null;
    this.extension = null;

    this.isWrongNetwork = false;
    this.extensionName = ex;
    let self = this;
  }

  async connect(currentInputNetWork) {
    //console.log("CONNECT BLOCKCHAIN_NETWORK==>", BLOCKCHAIN_NETWORK);
    let self = this;
    
    if (self.extensionName === extensionName.binanceExtension) {
      if (window.BinanceChain) {
        self.extension = window.BinanceChain;
        self.web3 = new Web3(window.BinanceChain);

        try {
          const envCheck = !(
            window.BinanceChain.chainId ===
              Web3.utils.numberToHex(CHAIN_ID.BSC[BLOCKCHAIN_NETWORK]) ||
            window.BinanceChain.chainId ===
              Web3.utils.numberToHex(CHAIN_ID.ETH[BLOCKCHAIN_NETWORK])
          );

  
          if (envCheck) {
            self.isWrongNetwork = true;
            return;
          }

          await window.BinanceChain.enable();
          const addresses = await self.web3.eth.getAccounts();
          self.address = addresses[0];
        } catch (error) {
          console.error(error.message);
          self.web3 = null;
        }
      } else throw new Error("Detect Binance Extension failed!");

      return window.BinanceChain.chainId;
    } else if (
      self.extensionName === extensionName.metamask ||
      self.extensionName === extensionName.trustWallet
    ) {
      if (window.ethereum) {
        // //console.log("get window.ethereum");
        self.extension = window.ethereum;
        self.web3 = new Web3(window.ethereum);

        // //console.log("window.ethereum enable");
        await window.ethereum.enable();

        //check current network
        let envCheck;
        if (
          typeof currentInputNetWork === "string" &&
          currentInputNetWork === "eth"
        ) {
          //connect with eth
           envCheck =
           !( window.ethereum.chainId ===
              Web3.utils.numberToHex(CHAIN_ID.ETH[BLOCKCHAIN_NETWORK]) ||
            window.ethereum.chainId === CHAIN_ID.ETH[BLOCKCHAIN_NETWORK] ||
            window.ethereum.networkVersion ===
              CHAIN_ID.ETH[BLOCKCHAIN_NETWORK] ||
            (!window.ethereum.chainId && !window.ethereum.networkVersion));

          //   //console.log("window.ethereum.chainId==>", window.ethereum.chainId);
          //   //console.log(" CHAIN_ID.ETH[BLOCKCHAIN_NETWORK]==>",  CHAIN_ID.ETH[BLOCKCHAIN_NETWORK]);
           
          // debugger
        } else {
          //connect with bsc
           envCheck = !(
            window.ethereum.chainId ===
              Web3.utils.numberToHex(CHAIN_ID.BSC[BLOCKCHAIN_NETWORK]) ||
            window.ethereum.chainId === CHAIN_ID.BSC[BLOCKCHAIN_NETWORK] ||
            window.ethereum.networkVersion === CHAIN_ID.BSC[BLOCKCHAIN_NETWORK] 
          );
       
        }

        if (envCheck) {
          self.isWrongNetwork = true;
          return;
        }

        try {
          const addresses = await self.web3.eth.getAccounts();
          self.address = addresses[0];
        } catch (error) {
          console.error(error.message);
          self.web3 = null;
        }
      } else throw new Error("Detect Wallet failed!");

      return window.ethereum.chainId 
    }

    
  }

  accountsChanged(callback) {
    const self = this;
    // //console.log(this.extension);

    this.extension.on("accountsChanged", function (accounts) {
      self.address = accounts[0];
      callback(accounts[0]);
    });
  }

  chainChanged(callback) {
    const self = this;
    // debugger;
    this.extension.on("chainChanged", function (chainId) {
      //console.log("chainId==>", chainId);
      self.extension = window.ethereum;
      self.web3 = new Web3(window.ethereum);
      callback(chainId);
    });
  }

  isConnected() {
    return this.web3 !== null;
  }
  checkWrongNetwork() {
    return this.isWrongNetwork;
  }

  //get current chain of extension
  getCurrentChainId() {
    return Number(window.ethereum.networkVersion);
  }



  async getTokenBalance(tokenAddress) {
    const tokenContract = new this.web3.eth.Contract(erc20Abi, tokenAddress);

    const tokenBalance = await tokenContract.methods
      .balanceOf(this.address)
      .call();
      // debugger
    return exactMath.div(Number(tokenBalance), exactMath.pow(10, 18))
  }

  async getGlitchBalance() {
  
    try {
      const glitchAddress = CHAIN_IDS.eth.includes(this.getCurrentChainId())
        ? ETH_GLITCH_ADDRESS
        : BSC_GLITCH_ADDRESS;
      const glitchBalance = await this.getTokenBalance(glitchAddress);
      return glitchBalance;
    } catch (error) {
      //console.log(error);
      return 0;
    }
  }

  async getEthSwapFee() {
    // debugger;
    try {
      const contract = new this.web3.eth.Contract(
        ethSwapAbi,
        ETH_BRIDGE_CONTRACT_ADDRESS
      );

      return this.fromWei(await contract.methods.swapFee().call());
    } catch (error) {
      //console.log(error);
      return null;
    }
  }

  async getBscSwapFee() {
    // debugger;
    try {
      const contract = new this.web3.eth.Contract(
        bscSwapAbi,
        BSC_BRIDGE_CONTRACT_ADDRESS
      );

      return this.fromWei(await contract.methods.swapFee().call());
    } catch (error) {
      //console.log(error);
      return null;
    }
  }

  //call approve smart contract use token f user
  async approve({ tokenContractAddress, contractAddress, amount }, callback) {
    const self = this;
    // //console.log("amount==>", amount);
    amount = calculateBalanceSend(amount);
    try {
      const tokenContract = new self.web3.eth.Contract(
        erc20Abi,
        tokenContractAddress
      );
      callback({
        status: "APPROVING",
      });
      const amountInHex = "0x" + amount.toString(16);
      //console.log(amountInHex);
      await tokenContract.methods
        .approve(contractAddress, amountInHex)
        .send({ from: self.address });
      // }
      callback({
        status: "APPROVED",
      });
    } catch (error) {
      callback({
        status: "APPROVE_FAILS",
      });
      //console.log(error);
    }
  }

  //call function swap BSC to ETH in smart contract
  async swapBSCtoETH({ amount }, callback) {
    const self = this;

    const contract = new self.web3.eth.Contract(
      bscSwapAbi,
      BSC_BRIDGE_CONTRACT_ADDRESS
    );
    const swapFee = await contract.methods.swapFee().call();
    amount = this.calculateSendAmount(Number(amount));

    try {
      const executeSwapResult = await contract.methods
        .swapBSC2ETH(amount)
        .send({ from: self.address, value: swapFee })
        .on("transactionHash", (hash) => {
          callback({
            status: "SWAP_BSC_TO_ETH_SUBMIT",
            txID: hash,
          });
        })
        .on("error", (error) => {
          //console.log(error);
          callback({
            status: "SWAP_BSC_TO_ETH_FAIL",
          });
        })
        .then((receipt) => {
          if (receipt.status === true) {
            callback({
              status: "SWAP_BSC_TO_ETH_SUCCESS",
              txID: receipt.transactionHash,
            });
          } else callback({ status: "SWAP_BSC_TO_ETH_FAIL" });
        })
        .catch((err) => {
          //console.log(err);
          callback({ status: "SWAP_BSC_TO_ETH_FAIL" });
        });
      return executeSwapResult;
    } catch (e) {
      console.error(e.message);
      callback({
        status: "SWAP_BSC_TO_ETH_FAIL",
      });
      return e.message;
    }
  }

  async swapETHtoBSC({ amount }, callback) {
    const self = this;

    const contract = new self.web3.eth.Contract(
      ethSwapAbi,
      ETH_BRIDGE_CONTRACT_ADDRESS
    );
    const swapFee = await contract.methods.swapFee().call();
    amount = this.calculateSendAmount(Number(amount));

    try {
      const executeSwapResult = await contract.methods
        .swapETH2BSC(amount)
        .send({ from: self.address, value: swapFee })
        .on("transactionHash", (hash) => {
          callback({
            status: "SWAP_ETH_TO_BSC_SUBMIT",
            txID: hash,
          });
        })
        .on("error", (error) => {
          //console.log(error);
          callback({
            status: "SWAP_ETH_TO_BSC_FAIL",
          });
        })
        .then((receipt) => {
          if (receipt.status === true) {
            callback({
              status: "SWAP_ETH_TO_BSC_SUCCESS",
              txID: receipt.transactionHash,
            });
          } else callback({ status: "SWAP_ETH_TO_BSC_FAIL" });
        })
        .catch((err) => {
          //console.log(err);
          callback({ status: "SWAP_ETH_TO_BSC_FAIL" });
        });
      return executeSwapResult;
    } catch (e) {
      console.error(e.message);
      callback({
        status: "SWAP_ETH_TO_BSC_FAIL",
      });
      return e.message;
    }
  }

  //get current account
  getCurrentAddress() {
    return this.address;
  }


  calculateSendAmount(amount) {
    return this.web3.utils.toWei(amount.toString(), "ether");
  }

  fromWei(amount) {
    return this.web3.utils.fromWei(amount.toString(), "ether");
  }

  async getBalanceAccount (){
   const symbol =  CHAIN_IDS.eth.includes(this.getCurrentChainId())?" ETH":" BNB"
    const balance = await this.web3.eth.getBalance(this.address)
    // debugger
    
     return helpers.formatNumberDownRoundWithExtractMax(this.fromWei(Number(balance)),8)  + symbol
    
  }

  //add function get getAllowance
  async getAllowance(tokenAddress, contractAddress) {
    const tokenContract = new this.web3.eth.Contract(erc20Abi, tokenAddress);

    const allocationNumber = await tokenContract.methods
      .allowance(this.address, contractAddress)
      .call();
      // return exactMath.div(allocationNumber, exactMath.pow(10, 18))
      return new BigNumber(allocationNumber.toString()).dividedBy(10 ** 18).toString()
    // return parseFloat(allocationNumber / 10 ** 18);
  }

}


