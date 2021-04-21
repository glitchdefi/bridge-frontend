import React, { useEffect, useState } from 'react';
import WalletExtensionUtils from "../../utils/walletExtensionUtils";
import { extensionName } from "../../constants/values";
import {
    isMetamaskAvailable,
    isBinanceExtensionAvailable,
    isTrustWalletAvailable,
} from "../../utils/utils";
import { actAlertMsgWarning } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_CONST } from '../../constants';
import { get } from 'lodash';




const ConnectWalletModal = (props) => {
    // const wallet = useWallet();
    const dispatch = useDispatch();
    //show hide button
    const [hasMetamask, setHasMetamask] = useState(false);
    const [hasTrustWallet, setHasTrustWallet] = useState(false);
    const [hasBinanceWallet, setHasBinanceWallet] = useState(false);
    const currentNetWork = useSelector((state) => get(state, "wallet.currentInputNetwork", "eth"));



    useEffect(() => {
        setTimeout(() => {
            addWallet();
        }, 3000);
    }, []);
    const addWallet = () => {
        setHasMetamask(isMetamaskAvailable());
        setHasTrustWallet(isTrustWalletAvailable());
        setHasBinanceWallet(isBinanceExtensionAvailable())

        // //set show modal help with mobile
        // if (isMobile() && !isTrustWalletAvailable() && !isMetamaskAvailable()) {
        //     dispatch({ type: ACTION_CONST.SET_SHOW_MODAL_HELP })
        // }
    };



    const connectWithExtension = async (extensionName) => {


        const temp = new WalletExtensionUtils(extensionName);
        //Connect action
        await temp.connect(currentNetWork);
        
        if (temp.checkWrongNetwork()) {

            dispatch(
                actAlertMsgWarning(

                    `Wrong network! You need connect to ${currentNetWork === "eth" ? "Ethereum network" : "Binance smart chain network"}!`

                )
            );
            return;
        }


        dispatch({
            type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
            data: temp
        })
        dispatch({
            type: ACTION_CONST.CURRENT_NET_WORK_EXTENSION,
            data: temp.getCurrentChainId()
        })


        // setIsSigning(extensionName);
        await getBalanceAndAddress(temp);

        // iff account exchange
        try {
            temp.accountsChanged(async (res) => {
                if (res !== undefined) {
                    // console.log('account changed')
                    dispatch({
                        type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
                        data: temp
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
             
                 await temp.connect(currentNetWork);
                if (temp.checkWrongNetwork()) {

                    dispatch(
                        actAlertMsgWarning(
                            "Wrong network! You need connect to Binance smart chain network!"
                        )
                    );
                    return;
                }
                dispatch({
                    type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
                    data: temp
                })
                
                dispatch({
                    type: ACTION_CONST.CURRENT_NET_WORK_EXTENSION,
                    data: temp.getCurrentChainId()
                })

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


        dispatch({
            type: ACTION_CONST.CONNECT_WALLET_SUCCESS,
            data: walletAddress
        })


    };


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
                                    <img src="/images/metamask.svg" width="30px" className="me-2" alt="metamask" />
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
                                    <img src="/images/binance-extension.svg" width="30px" className="me-2" alt="binance" />
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
                                    <img src="/images/trust_platform.png" width="30px" className="me-2" alt="trust_platform" />
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


