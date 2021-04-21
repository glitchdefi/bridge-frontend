import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import AmountInputPanel from '../../component/AmountInputPanel';
import AssetPanel from '../../component/AssetPanel';
import NetworkInputPanel from '../../component/NetworkInputPanel';
import Card from '../../component/Card';
import Column from '../../component/Column';
import Container from '../../component/Container';
import Row from '../../component/Row';
import { NETWORK_LIST, TOKEN_NAME } from '../../constants';
import { ACTION_CONST } from '../../constants';
import Particles from 'react-particles-js';

import { Button } from 'react-bootstrap';
import StepModal from './StepModal';

const BridgePortalPage = (props) => {
    const dispatch = useDispatch();

    const currentNetWork = useSelector((state) => get(state, "wallet.currentInputNetwork", "eth"));

    const [amount, setAmount] = useState(0);
    const [inputNetwork, setInputNetwork] = useState(NETWORK_LIST[0]);
    const [outputNetwork, setOutputNetwork] = useState(NETWORK_LIST[1]);

    const isConnectWallet = useSelector((state) =>
        get(state, 'utils.isConnectWallet', false)
    );


    useEffect(() => {
        // console.log("network==>", inputNetwork);
        dispatch({
            type: ACTION_CONST.CURRENT_INPUT_NETWORK,
            data: inputNetwork.id
        })
    }, [inputNetwork])

    

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
                        <h5 className="mb-3 d-flex align-items-center justify-content-center text-white font-20">GLITCH - BRIDGE 
                        </h5>
                        <div className="font-13 text-white mb-3 text-center">
                            {/* The safe, fast and most secure way to bring
                            cross-chain assets to Glitch chains. */}
                        </div>
                        <div className="card-wrap">
                            <Card>
                                <AssetPanel tokenName={TOKEN_NAME[currentNetWork]} />
                                {/* <DailyLimitPanel a="?" b="?" c="?" /> */}
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
                                            className="btn btn-link text-info me-2 btn-sm px-1 py-0 mb-3"
                                            onClick={handleNetworkSwap}
                                        >
                                            <i className="mdi mdi-swap-horizontal font-28"></i>
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
                                    tokenName={TOKEN_NAME[currentNetWork]}
                                />
                            </Card>
                        </div>
                        <div className="mt-3">
                            <Button
                                className="btn btn-primary btn-lg w-100"
                                disabled={!isConnectWallet || amount <= 0}
                                // onClick={handleSwapButtonClick}
                                data-bs-toggle="modal" data-bs-target="#stepModal"
                            >
                                SWAP
                                </Button>
                        </div>
                        <div className="bottom-errors">
                            {(!isConnectWallet) && <div className="bottom-error text-center mt-3 font-14"><i className="mdi mdi-alert me-1"></i>Please connect your wallet to swap.</div>}
                            {(isConnectWallet && amount <= 0) && <div className="bottom-error text-center mt-3 font-14"><i className="mdi mdi-alert me-1"></i>Your balance not available to swap.</div>}
                        </div>
                    </Column>
                </Row>
            </Container>
            <StepModal amount={amount}
                tokenName={TOKEN_NAME[currentNetWork]}
                inputNetwork={inputNetwork}
                outputNetwork={outputNetwork}
                clearAmount={() => setAmount(0)}
            />



            <Particles params={{
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 2000
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.6
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            }} />
        </>
    );
};

export default BridgePortalPage;
