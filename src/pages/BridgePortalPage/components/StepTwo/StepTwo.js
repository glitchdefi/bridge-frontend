import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

// Hooks
import {
  IsEthereumChain,
  IsBSCChain,
  approveTokenInMetamask,
  getAllowance,
  handleTransfer,
} from "../../hooks";

// Components
import { Box, Flex } from "../../../../component/Box";
import { Button } from "../../../../component/Button";
import { BackArrow, DisabledSwap } from "../../../../component/Svg";
import { Text } from "../../../../component/Text";
import { NetworkBox } from "../NetworkBox";
import { Spinner } from "../../../../component/Loading/Spinner";
import { useToast } from "../../../../hooks/useToast";

export function StepTwo({
  onBack,
  onSuccess,
  amount,
  inputNetwork,
  outputNetwork,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const ethSwapFee = useSelector((state) => get(state, "utils.ethSwapFee", 0));
  const bscSwapFee = useSelector((state) => get(state, "utils.bscSwapFee", 0));
  const walletUtils = useSelector((state) =>
    get(state, "utils.walletUtils", null)
  );

  const onConfirm = async () => {
    // Transfer ETH network -> BSC network
    if (inputNetwork.id === "eth" && outputNetwork.id === "bsc") {
      if (walletUtils) {
        const isETHChain = IsEthereumChain(toast, walletUtils);
        if (isETHChain) {
          setIsLoading(true);

          const allowance = await getAllowance({
            walletUtils,
            isETHtoBSC: true,
            amount,
          });

          // Start transfer
          if (allowance) {
            handleTransfer({
              toast,
              walletUtils,
              isETHtoBSC: true,
              amount,
              callback: ({ isSuccess }) => {
                setIsLoading(false);
                isSuccess && onSuccess();
              },
            });

            return;
          }

          // Approve token
          approveTokenInMetamask({
            toast,
            walletUtils,
            isETHtoBSC: true,
            amount,
            callback: () => setIsLoading(false),
          });
        }
      }
    }

    // Transfer BSC network -> ETH network
    if (inputNetwork.id === "bsc" && outputNetwork.id === "eth") {
      const isBSCChain = IsBSCChain(toast, walletUtils);

      if (isBSCChain) {
        setIsLoading(true);

        const allowance = await getAllowance({
          walletUtils,
          isETHtoBSC: false,
          amount,
        });

        // Start transfer
        if (allowance) {
          handleTransfer({
            toast,
            walletUtils,
            isETHtoBSC: false,
            amount,
            callback: ({ isSuccess }) => {
              setIsLoading(false);
              isSuccess && onSuccess();
            },
          });

          return;
        }

        // Approve token
        approveTokenInMetamask({
          toast,
          walletUtils,
          isETHtoBSC: false,
          amount,
          callback: () => setIsLoading(false),
        });
      }
    }
  };

  return (
    <>
      <Flex>
        <Button onClick={onBack}>
          <BackArrow width="24px" />
        </Button>
        <Text size="12px" ml="16px" bold textTransform="uppercase">
          Confirm Transfer
        </Text>
      </Flex>

      <AmountBox>
        <Flex>
          <img src="/images/small_logo.png" width="24px" />
          <StyledAmount>{amount}</StyledAmount>
          <Prefix>GLCH</Prefix>
        </Flex>
      </AmountBox>

      <Flex mt="16px">
        <NetworkBox label="From" network={inputNetwork} showBalance={false} />
        <DisabledSwap width="78px" />
        <NetworkBox label="To" network={outputNetwork} showBalance={false} />
      </Flex>

      <Flex mt="16px">
        <Text color="#A7C1CA">Bridge fees:</Text>
        <Text ml="12px">{`${
          inputNetwork?.id === "eth" ? ethSwapFee : bscSwapFee
        } ${inputNetwork?.id === "eth" ? "ETH" : "BNB"}`}</Text>
      </Flex>

      <Box mt="16px">
        {isLoading && (
          <Flex mt="16px">
            <Spinner />
            <Text size="12px" ml="12px" color="#A7C1CA">
              Please wait for Block confirmations...
            </Text>
          </Flex>
        )}

        {!isLoading && (
          <Button width="100%" variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        )}
      </Box>
    </>
  );
}

const AmountBox = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: #1c2a2f;
  border: 1px solid #395660;
`;

const StyledAmount = styled(Text)`
  flex: 1;
  margin-left: 12px;
  margin-right: 12px;
  font-size: 16px;
  font-weight: 400;
  cursor: default;
`;

const Prefix = styled(Text)`
  font-size: 16px;
  color: #4f7785;
  cursor: default;
`;
