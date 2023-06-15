import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import { LIMIT_VALUE, NETWORK_LIST } from "../../../../constants";
import { ACTION_CONST } from "../../../../constants";
import breakPoints from "../../../../utils/breakPoints";

// Components
import { NetworkBox } from "../../components/NetworkBox";
import { SwapIcon } from "../../../../component/Svg";
import { Button } from "../../../../component/Button";
import { AmountInput } from "../../components/AmountInput";
import { WarningBox } from "../../components/WarningBox";
import { ConnectWithMetamask } from "../../components/ConnectWithMetamask";
import { Box } from "../../../../component/Box";
import { TransferButton } from "../../components/TransferButton";
import styled from "styled-components";
import { MetamaskNotDetectedModal } from "../../../../component/Modal/MetamaskNotDetected";

export function StepOne({ onNext, data }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(data?.amount || 0);
  const [inputNetwork, setInputNetwork] = useState(data?.inputNetwork || NETWORK_LIST[0]);
  const [outputNetwork, setOutputNetwork] = useState(data?.outputNetwork || NETWORK_LIST[1]);
  const [enableTransfer, setEnableTransfer] = useState(false);
  const [showMetamaskNotDetected, setShowMetamaskNotDetected] = useState(false);

  const connectedWallet = useSelector((state) => get(state, "utils.isConnectWallet", false));

  useEffect(() => {
    dispatch({
      type: ACTION_CONST.CURRENT_INPUT_NETWORK,
      data: inputNetwork.id,
    });
  }, [inputNetwork]);

  const onTransfer = () => {
    onNext && onNext({ amount, inputNetwork, outputNetwork });
  };

  const onAmountChange = (amount, hasError) => {
    const isEnable =
      Number(amount) >= Number(LIMIT_VALUE.MIN) && Number(amount) <= Number(LIMIT_VALUE.MAX) && !hasError;

    setEnableTransfer(isEnable);
    setAmount(amount);
  };

  const onChangeNetwork = () => {
    const network = inputNetwork;
    setInputNetwork(outputNetwork);
    setOutputNetwork(network);
  };

  return (
    <>
      {/* Network Form */}
      <NetworkWrapper>
        <NetworkBox label="From" network={inputNetwork} showBalance={false} />
        <Button onClick={onChangeNetwork}>
          <SwapIcon />
        </Button>
        <NetworkBox label="To" network={outputNetwork} showBalance={false} />
      </NetworkWrapper>

      {/* Amount Input */}
      <AmountInput min={LIMIT_VALUE.MIN} max={LIMIT_VALUE.MAX} value={amount} onChange={onAmountChange} />

      {/* Warning minimum & maximum */}
      <WarningBox min={LIMIT_VALUE.MIN} max={LIMIT_VALUE.MAX} />

      {/* Connect Wallet, Transfer Button */}
      <Box mt="24px">
        {!connectedWallet && (
          <ConnectWithMetamask onShowInstallMetamaskModal={() => setShowMetamaskNotDetected(true)} />
        )}
        {connectedWallet && <TransferButton disabled={!enableTransfer} onClick={onTransfer} />}
      </Box>

      <MetamaskNotDetectedModal show={showMetamaskNotDetected} onHide={() => setShowMetamaskNotDetected(false)} />
    </>
  );
}

const NetworkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    transform: rotate(90deg);
    width: 60px;
    height: 100%;
  }

  @media ${breakPoints.device.lg} {
    flex-direction: row;

    svg {
      transform: rotate(0deg);
      width: 70px;
    }
  }
`;
