import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'react-bootstrap';
import AmountInputPanel from '../../component/AmountInputPanel';
import AssetPanel from '../../component/AssetPanel';
import NetworkInputPanel from '../../component/NetworkInputPanel';
import Card from '../../component/Card';
import Column from '../../component/Column';
import Container from '../../component/Container';
import DailyLimitPanel from '../../component/DailyLimitPanel';
import Row from '../../component/Row';
import { NETWORK_LIST, CHAIN_IDS, TOKEN_NAME } from '../../constants';
import { ACTION_CONST } from '../../constants';
import {
    BSC_TOKEN_ADDRESS,
    ETH_TOKEN_ADDRESS,
    BSC_BRIDGE_CONTRACT_ADDRESS,
    ETH_BRIDGE_CONTRACT_ADDRESS,
} from '../../_configs';
import StepModal from './StepModal';

const BridgePortalPage = (props) => {
    const dispatch = useDispatch();
    const currentNetWork = useSelector((state) => get(state, "wallet.currentInputNetwork", ""));

    const [amount, setAmount] = useState(0);
    const [inputNetwork, setInputNetwork] = useState(NETWORK_LIST[0]);
    const [outputNetwork, setOutputNetwork] = useState(NETWORK_LIST[1]);

    const isConnectWallet = useSelector((state) =>
        get(state, 'utils.isConnectWallet', false)
    );
    const walletUtils = useSelector((state) =>
        get(state, 'utils.walletUtils', null)
    );

    const handleSwapButtonClick = () => {
        if (walletUtils) {
            if (inputNetwork.id === 'bsc' && outputNetwork.id === 'eth') {
                if (!CHAIN_IDS.bsc.includes(walletUtils.getCurrentChainId())) {
                    dispatch({
                        type: ACTION_CONST.ALERT_FAILS,
                        message: 'Wrong network!',
                    });

                    return;
                }

                dispatch({
                    type: ACTION_CONST.REQUEST_SUBMIT,
                });
                walletUtils.approve(
                    {
                        tokenContractAddress: BSC_TOKEN_ADDRESS,
                        contractAddress: BSC_BRIDGE_CONTRACT_ADDRESS,
                        amount: amount,
                    },
                    (data) => {
                        if (data.status === 'APPROVED') {
                            dispatch({
                                type: ACTION_CONST.ALERT_SUCCESS,
                                message: 'Approve Tokens successfully!',
                            });

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
                                        dispatch({
                                            type: ACTION_CONST.ALERT_SUCCESS,
                                            message: 'Swap successfully!',
                                        });
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

                dispatch({
                    type: ACTION_CONST.REQUEST_SUBMIT,
                });
                walletUtils.approve(
                    {
                        tokenContractAddress: ETH_TOKEN_ADDRESS,
                        contractAddress: ETH_BRIDGE_CONTRACT_ADDRESS,
                        amount: amount,
                    },
                    (data) => {
                        if (data.status === 'APPROVED') {
                            dispatch({
                                type: ACTION_CONST.ALERT_SUCCESS,
                                message: 'Approve Tokens successfully!',
                            });

                            walletUtils.swapETHtoBSC(
                                {
                                    amount: amount,
                                },
                                (result) => {
                                    if (
                                        result.status ===
                                        'SWAP_ETH_TO_BSC_SUCCESS'
                                    ) {
                                        dispatch({
                                            type: ACTION_CONST.REQUEST_DONE,
                                        });
                                        dispatch({
                                            type: ACTION_CONST.ALERT_SUCCESS,
                                            message: 'Swap successfully!',
                                        });
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
    };

    const handleInputAmountChange = (value) => {
        setAmount(value);
    };

    const handleNetworkSwap = (value) => {
        const network = inputNetwork;
        setInputNetwork(outputNetwork);
        setOutputNetwork(network);
    };

    const handleInputNetworkChange = (value) => {
        if (value === outputNetwork) {
            handleNetworkSwap(value);
        } else {
            setInputNetwork(value);
        }
    };

    const handleOutputNetworkChange = (value) => {
        if (value === inputNetwork) {
            handleNetworkSwap(value);
        } else {
            setOutputNetwork(value);
        }
    };

    return (
        <>
            <Container>
                <Row>
                    <Column>
                        <Card title="BSCPad Bridge">
                            <div className="font-14 text-center">
                                The safe, fast and most secure way to bring
                                cross-chain assets to BSCPad chains.
                            </div>
                            <hr />
                            {/* <DailyLimitPanel a="?" b="?" c="?" /> */}
                            <AssetPanel tokenName="BSCPad" />
                            <div className="p-bridge d-flex align-items-center">
                                <NetworkInputPanel
                                    label="From"
                                    networkList={NETWORK_LIST}
                                    selectedNetwork={inputNetwork}
                                    onNetworkChange={handleInputNetworkChange}
                                />
                                <div className="p-bridge-swap">
                                    <button
                                        type="button"
                                        className="btn btn-link text-warning btn-sm px-1 py-0"
                                        onClick={handleNetworkSwap}
                                    >
                                        <i className="mdi mdi-swap-horizontal font-24"></i>
                                    </button>
                                </div>
                                <NetworkInputPanel
                                    label="To"
                                    networkList={NETWORK_LIST}
                                    selectedNetwork={outputNetwork}
                                    onNetworkChange={handleOutputNetworkChange}
                                />
                            </div>
                            <AmountInputPanel
                                label="Amount"
                                onAmountChange={handleInputAmountChange}
                            />
                            <div className="mt-3">
                                <Button
                                    className="btn btn-primary btn-lg w-100"
                                    disabled={!isConnectWallet || amount <= 0}
                                    onClick={handleSwapButtonClick}
                                >
                                    Swap
                                </Button>
                            </div>
                            <div class="bottom-errors">
                                {(!isConnectWallet) && <div className="bottom-error text-center text-warning mt-3 font-14"><i className="mdi mdi-alert-outline me-1"></i>Please connect your wallet to swap.</div>}
                                {(isConnectWallet && amount <= 0) && <div className="bottom-error text-warning text-center mt-3 font-14"><i className="mdi mdi-alert-outline me-1"></i>Your balance not available to swap.</div>}
                            </div>
                        </Card>
                    </Column>
                </Row>
            </Container>
            <StepModal amount={amount}
                tokenName={TOKEN_NAME[currentNetWork]}
                inputNetwork={inputNetwork}
                outputNetwork={outputNetwork}
                clearAmount={() => setAmount(0)}
            />
        </>
    );
};

export default BridgePortalPage;
