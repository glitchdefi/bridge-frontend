
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import BlockUi from "react-block-ui"
import "react-block-ui/style.css";
import { get } from 'lodash';
import { ACTION_CONST, LIMIT_VALUE } from '../../constants';
import {
    BSC_GLITCH_ADDRESS,
    ETH_GLITCH_ADDRESS,
    BSC_BRIDGE_CONTRACT_ADDRESS,
    ETH_BRIDGE_CONTRACT_ADDRESS,
    ETH_EXPLORER,
    BSC_EXPLORER
} from '../../_configs';
import {  CHAIN_IDS } from '../../constants';
import { getStatusSwap } from '../../redux/services/bridge.api';


const StepModal = ({ amount, tokenName, inputNetwork, outputNetwork, clearAmount }) => {
    const dispatch = useDispatch();

    const showBlockUI = useSelector((state) =>
        get(state, "utils.blocking", false)
    );
    const ethSwapFee = useSelector((state) =>
        get(state, "utils.ethSwapFee", 0)
    );
    const bscSwapFee = useSelector((state) =>
        get(state, "utils.bscSwapFee", 0)
    );
    const currentNetWork = useSelector((state) => get(state, "wallet.currentInputNetwork", ""));

    const walletUtils = useSelector((state) =>
        get(state, 'utils.walletUtils', null)
    );


    const [currentStep, setCurrentStep] = useState(0);
    const [step, setStep] = useState(1);
    const [txtID, setTxtID] = useState("");
    const [status, setStatus] = useState("pending")

    const handleApproveStep = async () => {
        if(amount >LIMIT_VALUE.MAX){
            dispatch({
                type: ACTION_CONST.ALERT_FAILS,
                message: `Your number has to less than ${LIMIT_VALUE.MAX}`,
            });
           return 
        }
        if(amount <LIMIT_VALUE.MIN){
            dispatch({
                type: ACTION_CONST.ALERT_FAILS,
                message: `Your number has to greater than ${LIMIT_VALUE.MIN}`,
            });
           return 
        }
        if (walletUtils) {
            if (inputNetwork.id === 'bsc' && outputNetwork.id === 'eth') {
                if (!CHAIN_IDS.bsc.includes(walletUtils.getCurrentChainId())) {
                    dispatch({
                        type: ACTION_CONST.ALERT_FAILS,
                        message: 'Wrong network!',
                    });

                    return;
                }

                


                //check allowence 
                const allowance = await walletUtils.getAllowance(BSC_GLITCH_ADDRESS, BSC_BRIDGE_CONTRACT_ADDRESS);
                //console.log("allowance==>", allowance);
                //check allowance > amount
                if(Number(allowance) >= Number(amount) ){
                    setStep(3)
                    setCurrentStep(2)
                    return;
                }

                //Block UI
                dispatch({
                    type: ACTION_CONST.REQUEST_SUBMIT,
                });

                //approve token
                walletUtils.approve(
                    {
                        tokenContractAddress: BSC_GLITCH_ADDRESS,
                        contractAddress: BSC_BRIDGE_CONTRACT_ADDRESS,
                        amount: amount,
                    },
                    (data) => {
                        if (data.status === 'APPROVED') {
                            dispatch({
                                type: ACTION_CONST.ALERT_SUCCESS,
                                message: 'Approve Tokens successfully!',
                            });
                            setStep(3)
                            setCurrentStep(2)
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });
                        }
                        if (data.status === 'APPROVE_FAILS') {
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });
                            dispatch({
                                type: ACTION_CONST.ALERT_FAILS,
                                message: 'Failed to Approve Tokens!',
                            });
                        }
                    }
                );

            } else if (inputNetwork.id === 'eth' && outputNetwork.id === 'bsc') {
                if (!CHAIN_IDS.eth.includes(walletUtils.getCurrentChainId())) {
                    dispatch({
                        type: ACTION_CONST.ALERT_FAILS,
                        message: 'Wrong network!',
                    });

                    return;
                }


                //check allowence 
                const allowance = await walletUtils.getAllowance(ETH_GLITCH_ADDRESS, ETH_BRIDGE_CONTRACT_ADDRESS);
                //console.log("allowance==>", allowance);
                // debugger
                //check allowance > amount
                if(Number(allowance) >= Number(amount) ){
                    setStep(3)
                    setCurrentStep(2)
                    return;
                }

                //Block UI
                dispatch({
                    type: ACTION_CONST.REQUEST_SUBMIT,
                });

                walletUtils.approve(
                    {
                        tokenContractAddress: ETH_GLITCH_ADDRESS,
                        contractAddress: ETH_BRIDGE_CONTRACT_ADDRESS,
                        amount: amount,
                    },
                    (data) => {
                        if (data.status === 'APPROVED') {
                            dispatch({
                                type: ACTION_CONST.ALERT_SUCCESS,
                                message: 'Approve Tokens successfully!',
                            });
                            setStep(3)
                            setCurrentStep(2)
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });

                        }
                        if (data.status === 'APPROVE_FAILS') {
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });
                            dispatch({
                                type: ACTION_CONST.ALERT_FAILS,
                                message: 'Failed to Approve Tokens!',
                            });
                        }
                    }
                );
            }
        }
    }

    const handleSwapClickStep = () => {
        if (walletUtils) {

            dispatch({
                type: ACTION_CONST.REQUEST_SUBMIT,
            });
            if (inputNetwork.id === 'bsc' && outputNetwork.id === 'eth') {
                if (!CHAIN_IDS.bsc.includes(walletUtils.getCurrentChainId())) {
                    dispatch({
                        type: ACTION_CONST.ALERT_FAILS,
                        message: 'Wrong network!',
                    });

                    return;
                }
                //swap
                walletUtils.swapBSCtoETH(
                    {
                        amount: amount,
                    },
                    (result) => {
                        if (
                            result.status ===
                            'SWAP_BSC_TO_ETH_SUCCESS'
                        ) {
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });

                            //set value 0 

                            setStep(4)
                            setCurrentStep(3)
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });



                            getStatus(inputNetwork.id, result.txID);

                            //alert notify with link
                            dispatch({

                                type: ACTION_CONST.ALERT_LINK,
                                alertType: "success",
                                alertUrl: `${BSC_EXPLORER}/tx/${result.txID}`,
                                alertMessage: `Swap successfully with txID ${result.txID}`,
                            })
                        }
                        if (
                            result.status === 'SWAP_BSC_TO_ETH_FAIL'
                        ) {
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });
                            dispatch({
                                type: ACTION_CONST.ALERT_FAILS,
                                message: 'Swap fail!',
                            });
                        }
                    }
                );

            } else if (inputNetwork.id === 'eth' && outputNetwork.id === 'bsc') {
                walletUtils.swapETHtoBSC(
                    {
                        amount: amount,
                    },
                    (result) => {
                        if (
                            result.status ===
                            'SWAP_ETH_TO_BSC_SUCCESS'
                        ) {

                            getStatus(inputNetwork.id, result.txID);
                            

                            setStep(4)
                            setCurrentStep(3)
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });

                            //alert with links
                            dispatch({

                                type: ACTION_CONST.ALERT_LINK,
                                alertType: "success",
                                alertUrl: `${ETH_EXPLORER}/tx/${result.txID}`,
                                alertMessage: `Swap successfully with txID ${result.txID}`,

                            })

                        }
                        if (
                            result.status === 'SWAP_ETH_TO_BSC_FAIL'
                        ) {
                            dispatch({
                                type: ACTION_CONST.REQUEST_DONE,
                            });
                            dispatch({
                                type: ACTION_CONST.ALERT_FAILS,
                                message: 'Swap fail!',
                            });
                        }
                    }
                );
            }
        }
    }

    const getStatus = (network, txID) => {
        const job = setInterval(() => {
            getStatusSwap(network, txID).then(data => {
                if (data) {
                    setTxtID(data["txid"]);
                    setStatus(data["status"].toLowerCase());
                    if (data["status"].toLowerCase() === "completed" || data["status"].toLowerCase() === "fail") {
                       
                        setCurrentStep(4);
                        clearInterval(job);
                    }
                }
            })
        }, 10* 1000)
    }

    const handleClear = () =>{
        setCurrentStep(0);
        setStep(1);
        setStatus("pending");
        setTxtID("")
        clearAmount();
    }

    return (
        <>

            <div className="modal fade" id="stepModal" tabIndex="-1" aria-labelledby="stepModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">

                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title text-dark w-100 text-center" id="stepModalLabel">GLITCH - BRIDGE PROCESS</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <BlockUi tag="div" blocking={showBlockUI}>
                            <div className="modal-body pt-4 pb-0 px-3">
                                <div className="bs-stepper w-100">
                                    <div className="bs-stepper-header" role="tablist">
                                        {/* your steps here */}
                                        <div className={`step ${step === 1 ? "current" : ""} ${currentStep >= 1 ? "completed" : ""}`} id="swapButtonStep1">
                                            <button type="button" className="step-trigger">
                                                <span className="bs-stepper-circle"><i className="mdi mdi-format-list-checkbox" /></span>
                                                <span className="bs-stepper-label">
                                                    {currentStep === 0 ? "Confirmation" : "Confirmed"}
                                                </span>
                                            </button>
                                        </div>
                                        <div className="line" id="swapLineStep1" />
                                        <div className={`step ${step === 2 ? "current" : ""} ${currentStep >= 2 ? "completed" : ""}`} id="swapButtonStep2">
                                            <button type="button" className="step-trigger" >
                                                <span className="bs-stepper-circle"><i className="mdi mdi-currency-usd" /></span>
                                                <span className="bs-stepper-label">
                                                    {currentStep <= 1 ? "Authorization" : "Approved"}
                                                </span>
                                            </button>
                                        </div>
                                        <div className="line" id="swapLineStep2" />
                                        <div className={`step ${step === 3 ? "current" : ""} ${currentStep >= 3 ? "completed" : ""}`} id="swapButtonStep3">
                                            <button type="button" className="step-trigger">
                                                <span className="bs-stepper-circle"><i className="mdi mdi-account-check-outline" /></span>
                                                <span className="bs-stepper-label">
                                                    {currentStep <= 2 ? "Depositing" : "Deposited"}
                                                </span>
                                            </button>
                                        </div>
                                        <div className="line" id="swapLineStep3" />
                                        <div className={`step ${step === 4 ? "current" : ""} ${currentStep >= 4 ?  status : ""}`} id="swapButtonStep4">
                                            <button type="button" className="step-trigger">
                                                <span className="bs-stepper-circle"><i className="mdi mdi-check" /></span>
                                                <span className="bs-stepper-label" style={{textTransform: "capitalize"}}>
                                                    {step === 4 ? status : "Completion"}

                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bs-stepper-content">
                                        {
                                            step === 1 && <div id="processStep1">
                                                <div className="text-center">
                                                    <h5>Information</h5>
                                                    <p className="mt-4">You want to swap  {`${amount || 0} ${tokenName}`} from {currentNetWork === "eth" ? "Ethereum network " : "Binance smart chain network "}
                                                to {currentNetWork === "eth" ? " Binance smart chain network" : " Ethereum network"}</p>
                                                    <div className="d-flex align-items-center justify-content-center mt-4">
                                                        <span className="text-purple me-2">You will receive</span>
                                                        <img className="mx-2" height="12" src="/images/tokens/bnb.png" alt="bnb"/>{' '}
                                                        {`${amount || 0} ${tokenName}`}
                                                        <span className="badge ms-2 p-coin-tag">{currentNetWork === "eth" ? "BEP20" : "ERC20"}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <span className="text-purple me-2">Swap fee:</span>
                                                        {`${currentNetWork === "eth" ? ethSwapFee || 0 : bscSwapFee || 0} ${currentNetWork === "eth" ? "ETH" : "BNB"} `}
                                                    </div>

                                                </div>
                                            </div>
                                        }
                                        {
                                            step === 2 && <div id="processStep2">
                                                <div className="text-center">
                                                    <h5>Pre-authorization</h5>
                                                    <div className="font-14 text-purple">1<sup>st</sup> of 2 transactions required.</div>
                                                    <p className="mt-4">First transaction is the Pre-authorization step, where you allow swap contract to access your tokens upto the provided amount.</p>
                                                    <p className="font-14 text-purple mt-5"><i className="mdi mdi-alert me-1"></i>You will be asked to confirm that allow the smart contract to have access to <b>{amount}</b> {tokenName} from your wallet.</p>
                                                </div>
                                            </div>
                                        }
                                        {
                                            step === 3 && <div id="processStep3">
                                                <div className="text-center">
                                                    <h5>Confirm</h5>
                                                    <p className="mt-4">Second transaction is the <b>Swap</b> step, where the provided amount of {tokenName} tokens will be actually swap in the contract.</p>
                                                    <p className="font-14 text-purple mt-5"><i className="mdi mdi-alert me-1"></i>This is the last transaction you need to make to finalize the swap.</p>
                                                </div>
                                            </div>
                                        }
                                        {
                                            step === 4 && <div id="processStep4">
                                                <div className="text-center">
                                                    <h5>Completion</h5>
                                                    <p className="mt-4">Submit swap token {tokenName} <br />From {currentNetWork === "eth" ? "Ethereum network" : "Binance smart chain network"}&nbsp;to&nbsp;{currentNetWork === "eth" ? "Binance smart chain network" : "Ethereum network"} successfully!</p>
                                                    <p className="font-14 text-purple mt-5"><i className="mdi mdi-alert me-1"></i>Please wait for the web3 wallet transaction to complete before any other action.</p>
                                                    <p>
                                                        {outputNetwork === "eth" && status !== "pending" ?
                                                            <a className="p-address" href={`${ETH_EXPLORER}/tx/${txtID}`} target="blank">{txtID}</a>
                                                            :
                                                            <a className="p-address" href={`${BSC_EXPLORER}/tx/${txtID}`} target="blank">{txtID}</a>
                                                        }

                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    </div>


                                </div>
                            </div>
                            <div className="modal-footer justify-content-center py-4" style={{ border: 0 }}>
                                {
                                    step === 1 &&
                                    <Button className="btn btn-primary btn-lg px-5"
                                        onClick={() => { setStep(2); setCurrentStep(1) }}
                                    >
                                        Confirm
                                    </Button>
                                }
                                {
                                    step === 2 &&
                                    <Button className="btn btn-primary btn-lg px-5"
                                        onClick={handleApproveStep} >
                                        Approve
                                    </Button>
                                }
                                {
                                    step === 3 &&
                                    <Button className="btn btn-primary btn-lg px-5"
                                        onClick={async ()=> handleSwapClickStep()}
                                    >
                                        Submit
                                    </Button>
                                }
                                {
                                    currentStep === 4 &&
                                    <Button className="btn btn-primary btn-lg px-5" data-bs-dismiss="modal"
                                        onClick={handleClear}
                                    >
                                        Done
                                    </Button>
                                }
                            </div>
                        </BlockUi>
                    </div>
                </div>

            </div>

        </>
    )
}
export default StepModal;