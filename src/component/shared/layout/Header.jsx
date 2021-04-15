import { fromPairs, get, isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { isMobile } from "web3modal";
import { ACTION_CONST, ROUTES, TOKEN_NAME } from "../../../constants";
// import { getKYC } from "../../../redux/services/kyc.api";
import { helpers } from "../../../utils/helpers";

const Header = (props) => {

  const dispatch = useDispatch();
  // const [isBrowserMobile, setIsBrowserMobile] = useState(false)
  const isConnectWallet = useSelector((state) => get(state, "utils.isConnectWallet", false));
  const showModalHelp = useSelector((state) => get(state, "utils.showModalHelp", false));
  const walletAddress = useSelector((state) => get(state, "utils.walletAddress", false));
  const walletUtils = useSelector((state) => get(state, "utils.walletUtils", null));
  const currentNetWork = useSelector((state) => get(state, "wallet.currentInputNetwork", "eth"));

  const [glitchBalance, setGlitchBalance] = useState(0);
  const [init, setInit] = useState(true);

  const [amountBalance, setAmountBalance] = useState(0)



  useEffect(() => {

    if (isConnectWallet && walletUtils) {
      walletUtils.getGlitchBalance().then(data => {
        setGlitchBalance(data)

        //set balance glitch to store
        dispatch({
          type: ACTION_CONST.GET_GLITCH_BALANCE,
          data
        })
        
        walletUtils.getBalanceAccount().then(balance => {
          setAmountBalance(balance)
        }).catch(err => console.log(err));

        
      })
      if (currentNetWork === "eth") {


        walletUtils.getEthSwapFee().then(data => {
          dispatch({
            type: ACTION_CONST.GET_ETH_SWAP_FEE,
            data
          })
        });
      }
      if (currentNetWork == "bsc") {

      

        walletUtils.getBscSwapFee().then(data => {
          dispatch({
            type: ACTION_CONST.GET_BSC_SWAP_FEE,
            data
          })
        });
      }


      setInit(false)
      if (init) {
        setInterval(() => {
          walletUtils.getGlitchBalance().then(data => {
            setGlitchBalance(data)

            //set balance glitch to store
            dispatch({
              type: ACTION_CONST.GET_GLITCH_BALANCE,
              data
            })
          })
        }, 5000);
      }

    }
  }, [dispatch, init, isConnectWallet, walletUtils, currentNetWork])




  return (
    <>
      <nav id="PPNavbar" className="navbar navbar-expand-md navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to={ROUTES.HOMEPAGE}>
            <img src="/images/logo.png" height="27" alt="GLITCH" className="me-2" />GLITCH
          </Link>
          {isMobile() &&
            <div className="d-flex align-items-center" style={{ flexWrap: 'nowrap' }}>
              <div className="dropdown  d-block d-md-none d-lg-none d-xl-none">
                {/* <button className="nav-link btn btn-sm btn-outline-primary btn-circle dropdown-toggle btn-helpmore" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-help"></i>
                </button> */}
                {/* <ul className="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#helpModal" href="#">How to connect wallet</a></li>
                </ul> */}
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"

                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          }

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link" to={ROUTES.HOMEPAGE}>
                  Bridge
                    </Link>
              </li> */}
            </ul>
            <ul className={isConnectWallet ? 'navbar-nav ms-auto mb-2 mb-md-0 connected' : 'navbar-nav ms-auto mb-2 mb-md-0'}>

              {
                !isConnectWallet ?
                  <li className="nav-item me-2">
                    <a className="btn btn-outline-primary btn-sm" href="#" data-bs-toggle="modal" data-bs-target={showModalHelp ? "#helpModal" : "#connectWalletModal"}>
                      <i className="mdi mdi-wallet-plus-outline me-1"></i>
                      <span>Connect Wallet</span>
                    </a>
                  </li>
                  :
                  <>
                    <li className="nav-item me-2 mb-2 mb-md-0">
                      <span className="btn btn-primary btn-purple btn-sm me-2"><b>{glitchBalance}</b> GLITCH</span>
                      {currentNetWork === "eth" &&
                        <span className="btn btn-primary btn-purple btn-sm"><b>{amountBalance}</b> ETH</span>
                      }
                      {currentNetWork === "bsc" &&
                        <span className="btn btn-primary btn-purple btn-sm"><b>{amountBalance}</b> BNB</span>
                      }

                    </li>
                    <li className="nav-item me-2 w-100 w-md-auto">
                      <a className="btn btn-primary btn-sm w-100 w-md-auto" href="#" data-bs-toggle="modal" data-bs-target="#walletModal">
                        <i className="mdi mdi-wallet-plus-outline me-1"></i>
                        {/* <input id="id-wallet-address" hidden={true} defaultValue={walletAddress || ""}></input> */}
                        <span>{helpers.formatTransactionHash(walletAddress, 8, 8)}</span>
                        {/* - <b>{helpers.formatNumberDownRound(glitchBalance, 4)}</b>{TOKEN_NAME[currentNetWork]} */}
                      </a>
                    </li>

                  </>

              }



            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
