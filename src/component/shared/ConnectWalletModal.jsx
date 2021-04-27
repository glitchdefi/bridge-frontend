import React, { useEffect, useState } from 'react';
import WalletExtensionUtils from "../../utils/walletExtensionUtils";
import { buyIdoContractState, extensionName } from "../../constants/values";
import {
    isMetamaskAvailable,
    isBinanceExtensionAvailable,
    isTrustWalletAvailable,
    calculateBalanceSend,
} from "../../utils/utils";
import { actAlertMsgWarning } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { ACTION_CONST } from '../../constants';
import { isMobile } from 'web3modal';
// import { getKYC } from '../../redux/services/kyc.api'



const ConnectWalletModal = (props) => {
    // const wallet = useWallet();
    const dispatch = useDispatch();
    //show hide button
    const [hasMetamask, setHasMetamask] = useState(false);
    const [hasTrustWallet, setHasTrustWallet] = useState(false);
    const [hasBinanceWallet, setHasBinanceWallet] = useState(false)
    // const [isSigning, setIsSigning] = useState(false);
    // const [extension, setExtension] = useState(null);





    useEffect(() => {
        setTimeout(() => {
            addWallet();
        }, 3000);
    }, []);
    const addWallet = () => {
        setHasMetamask(isMetamaskAvailable());
        setHasTrustWallet(isTrustWalletAvailable());
        setHasBinanceWallet(isBinanceExtensionAvailable())


        //set show modal help with mobile
        if (isMobile() && !isTrustWalletAvailable() && !isMetamaskAvailable()) {
            dispatch({ type: ACTION_CONST.SET_SHOW_MODAL_HELP })
        }
    };


    const connectWithExtension = async (extensionName) => {


        const temp = new WalletExtensionUtils(extensionName);
        //Connect action
        await temp.connect();
        if (temp.checkWrongNetwork()) {

            dispatch(
                actAlertMsgWarning(
                    "Wrong network! You need connect to Binance smart chain network!"
                )
            );
            return;
        }

        //Show Block UI
        dispatch({
            type: ACTION_CONST.REQUEST_SUBMIT
        })


        //Disable Block UI
        dispatch({
            type: ACTION_CONST.REQUEST_DONE
        })


        dispatch({
            type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
            data: temp
        })


        // setIsSigning(extensionName);
        await getBalanceAndAddress(temp);

        // iff account exchange
        try {
            temp.accountsChanged(async (res) => {
                if (res !== undefined) {
                    // console.log('account changed')
                    dispatch({
                        type: ACTION_CONST.CLEAR_KYC_STATE
                    })
                    await getBalanceAndAddress(temp);
                    
                }
            });

            return true;
        } catch (e) {
            dispatch({
                type: ACTION_CONST.REQUEST_DONE
            })
            console.log("error: ", e);
        }

        //if chain ID
        try {
            temp.chainChanged(async (chanId) => {
                // debugger
                await temp.connect();
                if (temp.checkWrongNetwork()) {

                    dispatch(
                        actAlertMsgWarning(
                            "Wrong network! You need connect to Binance smart chain network!"
                        )
                    );
                    return;
                }
                await getBalanceAndAddress(temp);
            })
        } catch (error) {

        }

    };
    const getExtension = () => {
        return extensionName;
    };
    const getBalanceAndAddress = async (extension) => {

        const walletAddress = await extension.getCurrentAddress();
        const bscpadBalance = await extension.getBscpadBalance();

        dispatch({
            type: ACTION_CONST.CONNECT_WALLET_SUCCESS,
            data: walletAddress
        })
        // if (bscpadBalance >= 1000) {
        //     getKYCAddress(walletAddress)

        //     const job = setInterval(() => {
        //         getKYCAddress(walletAddress)
        //     }, 30000)

        //     dispatch({
        //         type: ACTION_CONST.SET_JOB_GET_KYC,
        //         data: job
        //     })
        // }

    };

    // const getKYCAddress = (address) => {
    //     getKYC(address, 'state').then(response => {
    //         address = address.toLowerCase()
    //         if (response) {
              
    //             const state = response.state
    //             console.log('state===>', state)
    //             console.log('address==>', address)

    //             // dispatch({
    //             //     type: ACTION_CONST.GET_KYC_3RD,
    //             //     data: response.url
    //             // })
    //             // debugger
    //             if (state === 1) {
    //                 return dispatch({
    //                     type: ACTION_CONST.GET_KYC_INFO,
    //                     data: 'START'
    //                 })
    //             }
    //             if (state === 2) {
    //                 return dispatch({
    //                     type: ACTION_CONST.GET_KYC_INFO,
    //                     data: 'PENDING'
    //                 })
    //             }
    //             if (state === 3) {
    //                 return dispatch({
    //                     type: ACTION_CONST.GET_KYC_INFO,
    //                     data: 'APPROVED'
    //                 })
    //             }
    //             if (state === 4) {
    //                 return dispatch({
    //                     type: ACTION_CONST.GET_KYC_INFO,
    //                     data: 'ERROR'
    //                 })
    //             }


    //         }

    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    return (
        <>
            <div className="modal fade" id="connectWalletModal" tabIndex="-1" aria-labelledby="connectWalletModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title text-dark" id="connectWalletModalLabel">Connect to wallet</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            {
                                hasMetamask &&
                                <div className="c-list border-b px-3 py-2 d-flex align-items-center" data-bs-dismiss="modal" onClick={() => {
                                    connectWithExtension(
                                        getExtension().metamask
                                    )
                                }}>
                                    <img src="/images/metamask.svg" width="30px" className="me-2" />
                                    <div className="text-dark">
                                        Metamask - <span className="font-weight-bold">Desktop</span>
                                    </div>
                                </div>
                            }
                            {hasBinanceWallet &&
                                <div className="c-list border-b px-3 py-2 d-flex align-items-center" data-bs-dismiss="modal"
                                    onClick={() => {
                                        connectWithExtension(
                                            getExtension().binanceExtension
                                        )
                                    }}>
                                    <img src="/images/binance-extension.jpg" width="30px" className="me-2" />
                                    <div className="text-dark">
                                        Binance Chain Wallet
                             </div>
                                </div>
                            }

                            {
                                hasTrustWallet &&
                                <div className="c-list border-b px-3 py-2 d-flex align-items-center" data-bs-dismiss="modal"
                                    onClick={() => {
                                        connectWithExtension(
                                            getExtension().trustWallet
                                        )
                                    }}>
                                    <img src="/images/trust_platform.png" width="30px" className="me-2" />
                                    <div className="text-dark">
                                        Trust Wallet
                                </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConnectWalletModal;


