import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_CONST } from "../constants";
import { isMetamaskAvailable } from "../utils/utils";
import WalletExtensionUtils from "../utils/walletExtensionUtils";
import { useToast } from "./useToast";

const METAMASK = "METAMASK";

export const useConnectMetamask = () => {
  const { toastError } = useToast();
  const dispatch = useDispatch();
  const currentNetwork = useSelector((state) =>
    get(state, "wallet.currentInputNetwork", "eth")
  );

  return async () => {
    if (isMetamaskAvailable()) {
      const temp = new WalletExtensionUtils(METAMASK);
      // Connect action
      await temp.connect(currentNetwork);

      if (temp.checkWrongNetwork()) {
        toastError(
          "Wrong network",
          `You need connect to ${
            currentNetwork === "eth"
              ? "Ethereum network"
              : "Binance smart chain network"
          }`
        );

        return;
      }

      dispatch({
        type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
        data: temp,
      });
      dispatch({
        type: ACTION_CONST.CURRENT_NET_WORK_EXTENSION,
        data: temp.getCurrentChainId(),
      });

      // Get Address
      const walletAddress = await temp.getCurrentAddress();

      dispatch({
        type: ACTION_CONST.CONNECT_WALLET_SUCCESS,
        data: walletAddress,
      });

      try {
        temp.accountsChanged(async (res) => {
          if (res !== undefined) {
            dispatch({
              type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
              data: temp,
            });

            // Get Address
            const walletAddress = await temp.getCurrentAddress();

            dispatch({
              type: ACTION_CONST.CONNECT_WALLET_SUCCESS,
              data: walletAddress,
            });
          }
        });

        return true;
      } catch (e) {}

      try {
        temp.chainChanged(async () => {
          await temp.connect(currentNetwork);

          if (temp.checkWrongNetwork()) {
            toastError(
              "Wrong network",
              "You need connect to Binance smart chain network"
            );
            return;
          }

          dispatch({
            type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
            data: temp,
          });

          dispatch({
            type: ACTION_CONST.CURRENT_NET_WORK_EXTENSION,
            data: temp.getCurrentChainId(),
          });

          // Get Address
          const walletAddress = await temp.getCurrentAddress();

          dispatch({
            type: ACTION_CONST.CONNECT_WALLET_SUCCESS,
            data: walletAddress,
          });
        });
      } catch (error) {}
    }
  };
};
