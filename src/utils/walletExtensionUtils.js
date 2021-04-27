import Web3 from "web3";
import window from "global";
import chainId from "../contracts/chainId";
import erc20Abi from "../contracts/erc20.abi";
import abiContract from "../contracts/bscpad.json";
import ethSwapAbi from "../contracts/eth-swap.json";
import bscSwapAbi from "../contracts/bsc-swap.json";
import { calculateBalanceSend } from "./utils";
import { BigNumber } from "bignumber.js";
import {
    BLOCKCHAIN_NETWORK,
    BSC_TOKEN_ADDRESS,
    ETH_TOKEN_ADDRESS,
    BSC_BRIDGE_CONTRACT_ADDRESS,
    ETH_BRIDGE_CONTRACT_ADDRESS,
    BSC_BRIDGE_FEE,
    ETH_BRIDGE_FEE,
} from "../_configs";
import { CHAIN_IDS } from "../constants";

import { extensionName } from "../constants/values";

// console.log(BLOCKCHAIN_NETWORK);
export default class WalletExtensionUtils {
  constructor(ex) {
    this.web3 = null;
    this.extension = null;

    this.isWrongNetwork = false;
    this.extensionName = ex;
    let self = this;
  }

  async connect() {
    let self = this;
    if (self.extensionName === extensionName.binanceExtension) {
      if (window.BinanceChain) {
        self.extension = window.BinanceChain;
        self.web3 = new Web3(window.BinanceChain);
        console.log("CONNECT BLOCKCHAIN_NETWORK==>", BLOCKCHAIN_NETWORK);

        try {
          const envCheck =
            BLOCKCHAIN_NETWORK === "TESTNET"
              ? !(window.BinanceChain.chainId === Web3.utils.numberToHex(chainId.bscTestnet) ||
                window.BinanceChain.chainId === Web3.utils.numberToHex(chainId.ethTestnet))
              : !(window.BinanceChain.chainId === Web3.utils.numberToHex(chainId.bscMainnet) ||
              window.BinanceChain.chainId === Web3.utils.numberToHex(chainId.ethMainnet))

          // console.log("window.ethereum.chainId==>", window.ethereum.chainId);
          // console.log("Web3.utils.numberToHex(chainId.bscTestnet)==>", Web3.utils.numberToHex(chainId.bscTestnet));

          console.log(envCheck);
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
    } else if (
      self.extensionName === extensionName.metamask ||
      self.extensionName === extensionName.trustWallet
    ) {
      if (window.ethereum) {
        // console.log("get window.ethereum");
        self.extension = window.ethereum;
        self.web3 = new Web3(window.ethereum);

        // console.log("window.ethereum enable");
        await window.ethereum.enable();

        const envCheck =
          BLOCKCHAIN_NETWORK === "TESTNET"
            ? !(
              window.ethereum.chainId ===
              Web3.utils.numberToHex(chainId.bscTestnet) ||
              window.ethereum.chainId === chainId.bscTestnet ||
              window.ethereum.networkVersion === chainId.bscTestnet ||
              window.ethereum.chainId ===
              Web3.utils.numberToHex(chainId.ethTestnet) ||
              window.ethereum.chainId === chainId.ethTestnet ||
              window.ethereum.networkVersion === chainId.ethTestnet ||
              (!window.ethereum.chainId && !window.ethereum.networkVersion)
            )
            : !(
              window.ethereum.chainId ===
              Web3.utils.numberToHex(chainId.bscMainnet) ||
              window.ethereum.chainId === chainId.bscMainnet ||
              window.ethereum.networkVersion === chainId.bscMainnet ||
              window.ethereum.chainId ===
              Web3.utils.numberToHex(chainId.ethMainnet) ||
              window.ethereum.chainId === chainId.ethMainnet ||
              window.ethereum.networkVersion === chainId.ethMainnet ||
              (!window.ethereum.chainId && !window.ethereum.networkVersion)
            );

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
    }
  }

  accountsChanged(callback) {
    const self = this;
    // console.log(this.extension);

    this.extension.on("accountsChanged", function (accounts) {
      self.address = accounts[0];
      callback(accounts[0]);
    });
  }

  chainChanged(callback) {
    const self = this;
    debugger;
    this.extension.on("chainChanged", function (chainId) {
      console.log("chainId==>", chainId);
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

  async approve({ tokenContractAddress, contractAddress, amount }, callback) {
    const self = this;
    // console.log("amount==>", amount);
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
      console.log(amountInHex);
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
      console.log(error);
    }
  }

  async claim({ contractAddress, index }, callback) {
    const self = this;
    const contract = new self.web3.eth.Contract(abiContract, contractAddress);

    try {
      const claimResult = await contract.methods
        .claim(index)
        .send({ from: self.address })
        .on("error", (error) => {
          console.log(error);
          callback({
            status: "CLAIM_FAIL",
          });
        })
        .then((receipt) => {
          if (receipt.status == true) {
            callback({
              status: "CLAIM_SUCCESS",
              txID: receipt.transactionHash,
            });
          } else callback({ status: "CLAIM_FAIL" });
        })
        .catch((err) => {
          console.log(err);
          callback({ status: "CLAIM_FAIL" });
        });
      return claimResult;
    } catch (e) {
      console.error(e.message);
      callback({
        status: "CLAIM_FAIL",
      });
      return e.message;
    }
  }

  async buyTokens({ contractAddress, tokenAddress, amount }, callback) {
    const self = this;
    const contract = new self.web3.eth.Contract(abiContract, contractAddress);
    amount = calculateBalanceSend(amount);
    const amountInHex = "0x" + amount.toString(16);

    let sendObject;
    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      sendObject = { from: self.address, value: amountInHex };
    } else {
      sendObject = { from: self.address };
    }

    try {
      const boughtResult = await contract.methods
        .participate(tokenAddress, amountInHex)
        .send(sendObject)
        .on("error", (error) => {
          console.log(error);
          callback({
            status: "BUY_FAIL",
          });
        })
        .then((receipt) => {
          if (receipt.status == true) {
            callback({
              status: "BUY_SUCCESS",
              txID: receipt.transactionHash,
            });
          } else callback({ status: "BUY_FAIL" });
        })
        .catch((err) => {
          console.log(err);
          callback({ status: "BUY_FAIL" });
        });
      return boughtResult;
    } catch (e) {
      console.error(e.message);
      callback({
        status: "BUY_FAIL",
      });
      return e.message;
    }
  }

  //get current account
  getCurrentAddress() {
    return this.address;
  }

  async getInfoAllocations(wallet) {
    const claimStatus = {
      0: 'PENDING',
      1: 'OPEN',
      2: 'CLOSED'
    }
    const contract = new this.web3.eth.Contract(abiContract, wallet);
    const contractInfoAllocation = await contract.methods
      .infoAllocations()
      .call({ from: this.address })

    let infoAllocation = []
    for (let i = 0; i < contractInfoAllocation[0].length; i++) {
      infoAllocation.push({
        no: contractInfoAllocation[0][i],
        allocationAmount: contractInfoAllocation[1][i],
        timestamp: contractInfoAllocation[2][i],
        claimedAmount: contractInfoAllocation[3][i],
        status: claimStatus[contractInfoAllocation[4][i]]
      })
    }

    return infoAllocation

    // return [
    //   {
    //     no:1,
    //     allocationAmount: 10,
    //     timestamp: 1615973311,
    //     claimedAmount: 120,
    //     status: "PENDING"
    //   },
    //   {
    //     no:2,
    //     allocationAmount: 8,
    //     timestamp: 1615993311,
    //     claimedAmount: 20,
    //     status: "CLOSED"
    //   },
    //   {
    //     no:3,
    //     allocationAmount: 6,
    //     timestamp: 1615984311,
    //     claimedAmount: 40,
    //     status: "OPEN"
    //   }

    // ]
  }

  async getInfoWallet(wallet) {
    // await this.getTokenBalance('0x083c478DB9289a91b4d20D0f86716aF4371872Ef')
    // console.log(this.address, (new Date).getTime());
    const tokenContract = new this.web3.eth.Contract(abiContract, wallet);
    const contractInfo = await tokenContract.methods
      .infoWallet()
      .call({ from: this.address });
    const bnbBalance = parseFloat(contractInfo[0] / 10 ** 18);
    const tokenBalance = parseInt(contractInfo[1]);
    const tier = contractInfo[2]
    const roundState = parseInt(contractInfo[3]);
    const roundStateText = contractInfo[4];
    const roundTimestamp = parseInt(contractInfo[5]);
    const remainingAllocation = parseInt(contractInfo[6]);
    const userParticipation = parseInt(contractInfo[7]);


    return {
      tokenBalance,
      tier,
      roundState,
      roundStateText,
      // roundStateString,
      roundTimestamp,
      remainingAllocation,
      bnbBalance,
      userParticipation,
    };
  }

  async getTokenBalance(tokenAddress) {
    const tokenContract = new this.web3.eth.Contract(erc20Abi, tokenAddress);

    const tokenBalance = await tokenContract.methods
      .balanceOf(this.address)
      .call();

    // console.log(tokenBalance)
    return parseFloat(tokenBalance / 10 ** 18);
  }

  async getBscpadBalance() {
    const bscPadAddress = CHAIN_IDS.eth.includes(this.getCurrentChainId())
      ? ETH_TOKEN_ADDRESS : BSC_TOKEN_ADDRESS;
    const bscpadBalance = await this.getTokenBalance(bscPadAddress)
    return bscpadBalance;
  }

  getCurrentChainId() {
    return Number(window.ethereum.networkVersion);
  }

  async getAllowance(tokenAddress, contractAddress) {
    const tokenContract = new this.web3.eth.Contract(erc20Abi, tokenAddress);
    // const tokenContract = new this.web3.eth.Contract(abiContract, contractAddress);
    // console.log("this.address==>", this.address);
    const allocationNumber = await tokenContract.methods
      .allowance(this.address, contractAddress)
      .call();

    return parseFloat(allocationNumber / 10 ** 18);
  }

    async swapBSCtoETH({ amount }, callback) {
        const self = this;

        const contract = new self.web3.eth.Contract(bscSwapAbi, BSC_BRIDGE_CONTRACT_ADDRESS);
        amount = this.calculateSendAmount(Number(amount));

        try {
            const executeSwapResult = await contract.methods
                .swapBSC2ETH(BSC_TOKEN_ADDRESS, amount)
                .send({ from: self.address, value: BSC_BRIDGE_FEE })
                .on("transactionHash", hash=>{
                callback({
                    status: "SWAP_BSC_TO_ETH_SUBMIT",
                    txID: hash
                });
                })
                .on("error", (error) => {
                console.log(error);
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
                console.log(err);
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

        const contract = new self.web3.eth.Contract(ethSwapAbi, ETH_BRIDGE_CONTRACT_ADDRESS);
        amount = this.calculateSendAmount(Number(amount));

        try {
            const executeSwapResult = await contract.methods
                .swapETH2BSC(ETH_TOKEN_ADDRESS, amount)
                .send({ from: self.address, value: ETH_BRIDGE_FEE })
                .on("transactionHash", hash=>{
                callback({
                    status: "SWAP_ETH_TO_BSC_SUBMIT",
                    txID: hash
                });
                })
                .on("error", (error) => {
                console.log(error);
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
                console.log(err);
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

    calculateSendAmount(amount){
        return this.web3.utils.toWei(amount.toString(), 'ether');
    }
}

// getTokenBalance('0x083c478DB9289a91b4d20D0f86716aF4371872Ef')
// console.log(new WalletExtensionUtils("METAMASK"));
