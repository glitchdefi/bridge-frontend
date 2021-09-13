import { ACTION_CONST, CHAIN_IDS } from "../../../constants";
import { getStatusSwap } from "../../../redux/services/bridge.api";
import { useToast } from "../../../hooks/useToast";
import {
  BSC_GLITCH_ADDRESS,
  ETH_GLITCH_ADDRESS,
  BSC_BRIDGE_CONTRACT_ADDRESS,
  ETH_BRIDGE_CONTRACT_ADDRESS,
  BSC_EXPLORER,
  ETH_EXPLORER,
} from "../../../_configs";

export const approveTokenInMetamask = ({
  toast,
  walletUtils,
  amount,
  isETHtoBSC,
  callback,
}) => {
  const { toastSuccess, toastError } = toast;

  const tokenContractAddress = isETHtoBSC
    ? ETH_GLITCH_ADDRESS
    : BSC_GLITCH_ADDRESS;
  const contractAddress = isETHtoBSC
    ? ETH_BRIDGE_CONTRACT_ADDRESS
    : BSC_BRIDGE_CONTRACT_ADDRESS;

  walletUtils.approve(
    {
      tokenContractAddress,
      contractAddress,
      amount,
    },
    (data) => {
      // Success
      if (data.status === "APPROVED") {
        toastSuccess("Congrats!", "Approve Tokens successfully");
        // Handle loading
        callback && callback();
      }

      // Failed
      if (data.status === "APPROVE_FAILS") {
        toastError("Error", "Failed to Approve Tokens");
        // Handle loading
        callback && callback();
      }
    }
  );
};

export const handleTransfer = ({
  toast,
  walletUtils,
  amount,
  isETHtoBSC,
  callback,
}) => {
  isETHtoBSC
    ? transferETHtoBSC(toast, walletUtils, amount, callback)
    : transferBSCtoETH(toast, walletUtils, amount, callback);
};

const transferETHtoBSC = (toast, walletUtils, amount, callback) => {
  const { toastSuccess, toastError } = toast;

  walletUtils.swapETHtoBSC(
    {
      amount: amount,
    },
    (result) => {
      // Success
      if (result.status === "SWAP_ETH_TO_BSC_SUCCESS") {
        getStatus("eth", result.txID);

        toastSuccess("Congrats!", "Transferring has been successfully!");
        // Handle loading
        callback && callback({ isSuccess: true });
      }

      // Failed
      if (result.status === "SWAP_ETH_TO_BSC_FAIL") {
        toastError("Error!", "Transferring has been error!");

        // Handle loading
        callback && callback({ isSuccess: false });
      }
    }
  );
};

const transferBSCtoETH = (toast, walletUtils, amount, callback) => {
  const { toastSuccess, toastError } = toast;

  walletUtils.swapBSCtoETH(
    {
      amount: amount,
    },
    (result) => {
      // Success
      if (result.status === "SWAP_BSC_TO_ETH_SUCCESS") {
        getStatus("bsc", result.txID);

        toastSuccess("Congrats!", "Transferring has been successfully!");
        // Handle loading
        callback && callback({ isSuccess: true });
      }

      // Failed
      if (result.status === "SWAP_BSC_TO_ETH_FAIL") {
        toastError("Error!", "Transferring has been error!");
        // Handle loading
        callback && callback({ isSuccess: false });
      }
    }
  );
};

const getStatus = (network, txID) => {
  getStatusSwap(network, txID).then((data) => {
    if (data) {
      if (
        data["status"].toLowerCase() === "completed" ||
        data["status"].toLowerCase() === "fail"
      ) {
        console.log("error");
      }
    }
  });
};

export const getAllowance = async ({ walletUtils, isETHtoBSC, amount }) => {
  const tokenContractAddress = isETHtoBSC
    ? ETH_GLITCH_ADDRESS
    : BSC_GLITCH_ADDRESS;
  const contractAddress = isETHtoBSC
    ? ETH_BRIDGE_CONTRACT_ADDRESS
    : BSC_BRIDGE_CONTRACT_ADDRESS;

  const allowance = await walletUtils.getAllowance(
    tokenContractAddress,
    contractAddress
  );

  if (Number(allowance) >= Number(amount)) {
    return true;
  }

  return false;
};

export const IsEthereumChain = (toast, walletUtils) => {
  const { toastError } = toast;
  if (!CHAIN_IDS.eth.includes(walletUtils.getCurrentChainId())) {
    toastError("Error", "Wrong network");
    return false;
  }

  return true;
};

export const IsBSCChain = (toast, walletUtils) => {
  const { toastError } = toast;

  if (!CHAIN_IDS.bsc.includes(walletUtils.getCurrentChainId())) {
    toastError("Error", "Wrong network");
    return false;
  }

  return true;
};
