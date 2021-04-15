import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function AmountInputPanel({ label, onAmountChange, tokenName }) {
  const [amount, setAmount] = useState(0);


  const isConnectWallet = useSelector((state) =>
    get(state, 'utils.isConnectWallet', false)
  );
  const walletUtils = useSelector((state) =>
    get(state, 'utils.walletUtils', null)
  );
  const walletAddress = useSelector((state) =>
    get(state, "utils.walletAddress", "")
  );
  const glitchBalance = useSelector((state) =>
    get(state, "utils.glitchBalance", 0)
  );
  const ethSwapFee = useSelector((state) =>
    get(state, "utils.ethSwapFee", 0)
  );
  const bscSwapFee = useSelector((state) =>
    get(state, "utils.bscSwapFee", 0)
  );

  const currentNetWork = useSelector((state) => get(state, "wallet.currentInputNetwork", ""));

  useEffect(() => {
    setAmount(0);
  }, [glitchBalance])


  const handleInputAmountChange = (e) => {
    if (isConnectWallet) {
      const value = Number(e.target.value);

      if (value > glitchBalance) {
        handleMaxButtonClick();
        return;
      }

      setAmount(value);
      onAmountChange(value);
    }
  };

  const handleMaxButtonClick = () => {
    if (isConnectWallet) {
      setAmount(glitchBalance);
      onAmountChange(glitchBalance);
    }
  }

  return (
    <>
      <div className="p-form-group">
        <label className="form-label p-main-text">{label}</label>
        <div className="p-input-group">
          <input
            type="number"
            className="form-control px-0"
            placeholder="0.0"
            value={amount}
            onChange={(e) => handleInputAmountChange(e)}
            disabled={!isConnectWallet}
          />

          {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Tooltip!</Tooltip>}>
            <Button className="btn-max btn-sm" onClick={handleMaxButtonClick} disabled={!isConnectWallet}>MAX</Button>
          </OverlayTrigger> */}
        </div>
      </div>
      {/* <div className="font-14 d-flex align-items-center">
        <span className="text-purple me-2">You will receive</span>
        <img className="mx-2" height="12" src="/images/tokens/bnb.png" />{' '}
        {`${amount || 0} ${tokenName}`}
        <span className="badge ms-2 p-coin-tag">{currentNetWork === "eth" ? "BEP20" : "ERC20"}</span>
      </div>
      <div className="font-14 d-flex align-items-center">
        <span className="text-purple me-2">Swap fee:</span>
        {`${currentNetWork === "eth" ? ethSwapFee || 0 : bscSwapFee || 0} ${currentNetWork === "eth" ? "ETH" : "BNB"} `}
      </div> */}
    </>
  );
}
