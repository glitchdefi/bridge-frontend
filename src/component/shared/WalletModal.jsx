import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { ACTION_CONST } from "../../constants";
import { fromPairs, get, isEmpty } from "lodash";
import useCopyToClipboard from './CopyToClibboard';
import { BSC_EXPLORER } from '../../_configs';

const WalletModal = (props) => {
    const dispatch = useDispatch();
    const [copied, setCopied] = useCopyToClipboard(1000);
    const walletAddress = useSelector((state) =>
        get(state, "utils.walletAddress", false)
    );
    const handleLogout = () => {
        dispatch({
            type: ACTION_CONST.LOG_OUT_WALLET_SUCCESS
        })

        window.location.reload();
    }

    return (
        <>
            <div className="modal fade " id="walletModal" tabIndex="-1" aria-labelledby="walletModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title text-dark" id="walletModalLabel">Your wallet</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <h5 style={{ fontSize: '17px', wordBreak: 'break-word' }} className="text-dark mb-2"><b>{walletAddress}</b></h5>
                                <a href={`${BSC_EXPLORER}/address/${walletAddress}`} target="_blank" className="text-warning d-inline-flex align-items-center me-4" style={{ textDecoration: 'none' }}><span className="me-1">View on BscScan</span><i className="mdi mdi-open-in-new"></i></a>
                                <a className="text-warning d-inline-flex align-items-center" href="#" onClick={() => setCopied(walletAddress)} style={{ textDecoration: 'none' }}>
                                    <span className="me-1">Copy Address</span>{!copied ? <i className="mdi mdi-content-copy"></i> : <i className="mdi mdi-check"></i>}
                                </a>
                            </div>
                            <div className="text-center mt-4">
                                <a href="#" className="btn btn-outline-primary" onClick={handleLogout} data-bs-dismiss="modal">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WalletModal;


