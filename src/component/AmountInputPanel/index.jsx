import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export default function AmountInputPanel({ label, onAmountChange }) {
    const [amount, setAmount] = useState(0);
    const [bscPadBalance, setBscPadBalance] = useState(0);

    const isConnectWallet = useSelector((state) =>
      get(state, 'utils.isConnectWallet', false)
    );
    const walletUtils = useSelector((state) =>
      get(state, 'utils.walletUtils', null)
    );
    const walletAddress = useSelector((state) =>
      get(state, "utils.walletAddress", "")
    );

    useEffect(() => {
      if (walletUtils && walletAddress) {
        // get bscPad balance
        walletUtils.getBscpadBalance().then(data => {
            setBscPadBalance(data)
        })
      }

    }, [walletUtils, walletAddress]);

    const handleInputAmountChange = (e) => {
      if (isConnectWallet) {
        const value = Number(e.target.value);

        if (value > bscPadBalance) {
          handleMaxButtonClick();
          return;
        }

        setAmount(value);
        onAmountChange(value);
      }
    };

    const handleMaxButtonClick = () => {
      if (isConnectWallet) {
        setAmount(bscPadBalance);
        onAmountChange(bscPadBalance);
      }
    }

    return (
        <>
            <div className="p-form-group mb-2">
                <label className="form-label p-main-text">{label}</label>
                <div className="p-input-group">
                    <input
                        type="number"
                        className="form-control px-0"
                        placeholder="0.0"
                        // value={Number(amount)}
                        onChange={(e) => handleInputAmountChange(e)}
                        disabled={!isConnectWallet}
                    />
                    <Button 
                      onClick={handleMaxButtonClick}
                      disabled={!isConnectWallet}
                    >MAX</Button>
                </div>
            </div>
            {/* <div className="font-14 d-flex align-items-center">
                You will receive ={' '}
                <img className="mx-2" height="12" src="/images/tokens/bnb.png" />{' '}
                {amount || 0} BSCPad{' '}
                <span className="badge ms-2 p-coin-tag">BEP20</span>
            </div> */}
        </>
    );
}
