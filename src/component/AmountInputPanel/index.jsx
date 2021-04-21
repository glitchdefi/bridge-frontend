import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

export default function AmountInputPanel({ label, onAmountChange, tokenName }) {
  const [amount, setAmount] = useState(0);


  const isConnectWallet = useSelector((state) =>
    get(state, 'utils.isConnectWallet', false)
  );

  const glitchBalance = useSelector((state) =>
    get(state, "utils.glitchBalance", 0)
  );


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
    </>
  );
}
