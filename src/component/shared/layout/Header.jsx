import { fromPairs, get, isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { isMobile } from "web3modal";
import { ACTION_CONST, ROUTES } from "../../../constants";
// import { getKYC } from "../../../redux/services/kyc.api";
import { helpers } from "../../../utils/helpers";

const Header = (props) => {

  const dispatch = useDispatch();
  // const [isBrowserMobile, setIsBrowserMobile] = useState(false)
  const isConnectWallet = useSelector((state) => get(state, "utils.isConnectWallet", false));
  const showModalHelp = useSelector((state) => get(state, "utils.showModalHelp", false));
  const walletAddress = useSelector((state) => get(state, "utils.walletAddress", false));
  const walletUtils = useSelector((state) => get(state, "utils.walletUtils", null));

//   const kycStatus = useSelector((state) => get(state, "wallet.kycStatus", null));
  const kyc3rdURL = useSelector((state) => get(state, "wallet.kycURL", "#"))
  const [bscpadBalance, setBscpadBalance] = useState(0);
  const [init, setInit] = useState(true);

  // useEffect(() => {
  //   if (walletAddress) {
  //     document.getElementById('id-wallet-address').value = walletAddress;
  //   }
  // }, [walletAddress]);




  useEffect(() => {

    if (isConnectWallet && walletUtils) {
      walletUtils.getBscpadBalance().then(data => {
        setBscpadBalance(data)
      })
      setInit(false)
      if (init) {
        setInterval(() => {
          walletUtils.getBscpadBalance().then(data => {
            setBscpadBalance(data)
          })
        }, 5000);
      }

    }
  }, [init, isConnectWallet, walletUtils])

  function toggleTheme() {
    if (document.body.classList.contains('darkmode')) {
      document.body.classList.remove('darkmode');
    } else {
      document.body.classList.add('darkmode');
    }
  }

  const handleLogout = () => {
    dispatch({
      type: ACTION_CONST.LOG_OUT_WALLET_SUCCESS
    })
  }



  const handGotToProject = () => {
    dispatch({
      type: ACTION_CONST.CLEAR_INTERVAL_JOB
    })
  }

//   const handleOnclickKyc = () => {
//     (walletAddress, 'url').then(data => {
//       if(data){
//         const url = data.url
//         window.open(url, "_blank")
//       }
      
//     }).getKYCcatch(err => {
//       console.log(err);
//     })
//   }
  return (
    <>
      <nav id="PPNavbar" className="navbar navbar-expand-md navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to={ROUTES.HOMEPAGE}>
            <img src="/images/logo.png" height="27" alt="BSCPad" className="me-2" /> BSCPad
          </Link>
          {isMobile() &&
            <div className="d-flex align-items-center" style={{ flexWrap: 'nowrap' }}>
              <div className="dropdown  d-block d-md-none d-lg-none d-xl-none">
                <button className="nav-link btn btn-sm btn-outline-primary btn-circle dropdown-toggle btn-helpmore" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-help"></i>
                </button>
                <ul className="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#helpModal" href="#">How to connect wallet</a></li>
                  {isConnectWallet && <li><a className="dropdown-item" href="https://bscpad.medium.com/bscpad-kyc-process-16e6a5557138" target="_blank">KYC Help</a></li>}
                </ul>
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"

                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          }

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to={ROUTES.BRIDGE}>
                        Bridge
                    </Link>
                </li>
            </ul>
            <ul className={isConnectWallet ? 'navbar-nav ms-auto mb-2 mb-md-0 connected' : 'navbar-nav ms-auto mb-2 mb-md-0'}>
              {/* <li className="nav-item me-2">
                <Link className="btn btn-outline-primary btn-sm" aria-current="page" to={ROUTES.PROJECTS} onClick={handGotToProject}>
                  <i className="mdi mdi-fire me-1"></i>
                  <span>Projects</span>
                </Link>
              </li> */}
              {
                !isConnectWallet ?
                  <li className="nav-item me-2">
                    <a className="btn btn-primary btn-sm" href="#" data-bs-toggle="modal" data-bs-target={showModalHelp ? "#helpModal" : "#connectWalletModal"}>
                      <i className="mdi mdi-wallet-plus-outline me-1"></i>
                      <span>Connect Wallet</span>
                    </a>
                  </li>
                  :
                  <>
                    <li className="nav-item me-2">
                      <a className="btn btn-primary btn-sm" href="#" data-bs-toggle="modal" data-bs-target="#walletModal">
                        <i className="mdi mdi-wallet-plus-outline me-1"></i>
                        {/* <input id="id-wallet-address" hidden={true} defaultValue={walletAddress || ""}></input> */}
                        <span>{helpers.formatTransactionHash(walletAddress, 8, 8)}</span> - <b>{helpers.formatNumberDownRound(bscpadBalance, 4)}</b> BSCPAD
                    </a>
                    </li>

                    {/* {
                      kycStatus === 'START' &&
                      <li className="nav-item me-2">
                        <button className="btn btn-warning btn-sm"  
                          onClick={() => handleOnclickKyc()}
                          id="bnt-kyc-start">
                          <i className="mdi mdi-file-edit-outline me-1"></i>
                          <span>KYC</span>
                        </button>
                      </li>
                    }
                    {
                      kycStatus === 'PENDING' &&
                      <li className="nav-item me-2">
                        <button className="btn btn-primary btn-sm"  
                          onClick={() => handleOnclickKyc()}>
                          <i className="mdi mdi-clock-outline"></i>
                          <span> KYC</span>
                        </button>
                      </li>
                    }
                    {
                      kycStatus === 'APPROVED' &&
                      <li className="nav-item me-2">
                        <button className="btn btn-success btn-sm"  
                          onClick={() => handleOnclickKyc()}>
                          <i className="mdi mdi-check"></i>
                          <span> KYC</span>
                        </button>
                      </li>
                    }
                    {
                      kycStatus === 'ERROR' &&
                      <li className="nav-item me-2">
                        <button className="btn btn-danger btn-sm"  
                          onClick={() => handleOnclickKyc()}
                        >
                          <i className="mdi mdi-close me-1"></i>
                          <span> KYC</span>
                        </button>

                      </li>
                    } */}

                  </>

              }
              {/* <li className="nav-item me-2">
                <Link className="btn btn-outline-primary btn-sm" aria-current="page" to={ROUTES.PROJECTS} onClick={handGotToProject}>
                  <i className="mdi mdi-fire me-1"></i>
                  <span>Projects</span>
                </Link>
              </li> */}
              <li className="nav-item me-2">
                <button className="nav-link btn btn-sm btn-outline-primary btn-circle" type="button" onClick={() => toggleTheme()}>
                  <i className="mdi mdi-lightbulb-on"></i>
                </button>
              </li>
              {
                !isMobile() && isConnectWallet &&
                <li className="nav-item d-none d-md-block">
                  <div className="dropdown">
                    <button className="nav-link btn btn-sm btn-outline-primary btn-circle dropdown-toggle btn-helpmore" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="mdi mdi-help"></i>
                    </button>
                    <ul className="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" href="https://bscpad.medium.com/bscpad-kyc-process-16e6a5557138" target="_blank">KYC Help</a></li>
                    </ul>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
