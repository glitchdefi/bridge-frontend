import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { ACTION_CONST } from "../../constants";
import breakPoints from "../../utils/breakPoints";

// Components
import { Logo } from "./components/Logo";
import { NavBarToggler } from "./components/NavBarToggler";
import { NavMenu } from "./components/NavMenu/NavMenu";
import { WalletInfo } from "../Modal/WalletInfo";
import { useConnectMetamask } from "../../hooks/useConnectMetamask";
import { useLogout } from "../../hooks/useLogout";
import { MetamaskNotDetectedModal } from "../Modal/MetamaskNotDetected";

const Header = () => {
  const dispatch = useDispatch();
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [showMetamaskNotDetected, setShowMetamaskNotDetected] = useState(false);
  const [glitchBalance, setGlitchBalance] = useState(0);
  const [amountBalance, setAmountBalance] = useState(0);
  const [init, setInit] = useState(true);

  const isConnectWallet = useSelector((state) =>
    get(state, "utils.isConnectWallet", false)
  );
  const walletAddress = useSelector((state) =>
    get(state, "utils.walletAddress", false)
  );
  const walletUtils = useSelector((state) =>
    get(state, "utils.walletUtils", null)
  );
  const currentNetWork = useSelector((state) =>
    get(state, "wallet.currentInputNetwork", "eth")
  );
  const currentNetWorkId = useSelector((state) =>
    get(state, "wallet.currentNetWorkId", "")
  );

  const onConnectMetamask = useConnectMetamask();
  const { isUserLogout } = useLogout();

  useEffect(() => {
    if (isUserLogout !== "true") {
      onConnectMetamask();
    }
  }, []);

  useEffect(() => {
    if (isConnectWallet && walletUtils) {
      walletUtils.getGlitchBalance().then((data) => {
        setGlitchBalance(data);

        //set balance glitch to store
        dispatch({
          type: ACTION_CONST.GET_GLITCH_BALANCE,
          data,
        });
      });

      walletUtils
        .getBalanceAccount()
        .then((balance) => {
          setAmountBalance(balance);
        })
        .catch((err) => console.log(err));
      if (currentNetWork === "eth") {
        walletUtils.getEthSwapFee().then((data) => {
          dispatch({
            type: ACTION_CONST.GET_ETH_SWAP_FEE,
            data,
          });
        });
      }
      if (currentNetWork == "bsc") {
        walletUtils.getBscSwapFee().then((data) => {
          dispatch({
            type: ACTION_CONST.GET_BSC_SWAP_FEE,
            data,
          });
        });
      }

      if (init) {
        setInit(false);
        const job = setInterval(() => {
          walletUtils.getGlitchBalance().then((data) => {
            setGlitchBalance(data);

            //set balance glitch to store
            dispatch({
              type: ACTION_CONST.GET_GLITCH_BALANCE,
              data,
            });
          });

          dispatch({
            type: ACTION_CONST.CURRENT_NET_WORK_EXTENSION,
            data: walletUtils.getCurrentChainId(),
          });

          walletUtils
            .getBalanceAccount()
            .then((balance) => {
              setAmountBalance(balance);
            })
            .catch((err) => console.log(err));
        }, 3 * 1000);
        // set reducer getbalance
        dispatch({ type: ACTION_CONST.SET_JOB_GET_BALANCE, data: job });
      }
    }
  }, [isConnectWallet, walletUtils, currentNetWorkId]);

  return (
    <>
      <StyledNav className="navbar navbar-expand-xl">
        <Logo />
        <NavBarToggler />
        <NavMenu
          isConnectWallet={isConnectWallet}
          glitchBalance={glitchBalance}
          amountBalance={amountBalance}
          walletAddress={walletAddress}
          currentNetWorkId={currentNetWorkId}
          onShowWalletInfo={() => setShowWalletInfo(true)}
          onShowInstallMetamaskModal={() => setShowMetamaskNotDetected(true)}
        />

        {/* Modal */}
        <WalletInfo
          show={showWalletInfo}
          onHide={() => setShowWalletInfo(false)}
        />

        <MetamaskNotDetectedModal
          show={showMetamaskNotDetected}
          onHide={() => setShowMetamaskNotDetected(false)}
        />
      </StyledNav>
    </>
  );
};

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  background-color: #151f23;
  padding-left: 16px;
  padding-right: 16px;

  @media ${breakPoints.device.lg} {
    background-color: transparent;
    padding-left: 60px;
    padding-right: 60px;
  }

  @media ${breakPoints.device.xl} {
    padding-left: 120px;
    padding-right: 120px;
  }
`;

export default Header;
