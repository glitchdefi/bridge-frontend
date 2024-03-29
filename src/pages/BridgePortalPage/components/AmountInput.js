import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { get } from "lodash";

import breakPoints from "../../../utils/breakPoints";

// Components
import { Box, Flex } from "../../../component/Box";
import { Text } from "../../../component/Text";

export function AmountInput({ value, min, max, onChange }) {
  const [amount, setAmount] = useState(value || "");
  const [hasError, setHasError] = useState({
    min: false,
    max: false,
    decimals: false,
  });

  const isConnectWallet = useSelector((state) => get(state, "utils.isConnectWallet", false));
  const glitchBalance = useSelector((state) => get(state, "utils.glitchBalance", 0));

  useEffect(() => {
    const error = hasError.min || hasError.decimals || hasError.max;
    onChange(amount, error);
  }, [amount]);

  const onAmountChange = (e) => {
    const value = e.target.value;
    // E.g: 100.888888888
    const newValue = value?.includes(".") ? value?.split(".")[0] : value;

    const isMinError = newValue && Number(newValue) < Number(min);
    const isMaxError =
      (value?.split(".")?.length > 0 && Number(newValue) === Number(max) && Number(value?.split(".")[1]) > 0) ||
      Number(newValue) > Number(max);
    const isDecimalsError = value?.split(".")?.length > 0 && value?.split(".")[1]?.length > 18;

    if (isMinError) {
      setHasError({ ...hasError, min: true });
    } else if (isDecimalsError) {
      setHasError({ ...hasError, decimals: true });
    } else if (isMaxError) {
      setHasError({ ...hasError, max: true });
    } else {
      setHasError({ min: false, max: false, decimals: false });
    }

    setAmount(Number(value) > Number(glitchBalance) ? glitchBalance : value);
  };

  const onMaxClick = () => {
    setHasError({ min: false, max: false, decimals: false });
    setAmount(glitchBalance);
  };
  return (
    <>
      <Wrapper error={hasError.min || hasError.decimals || hasError.max}>
        <Flex className="input-wrapper">
          <Flex flex="1">
            <img src="/images/small_logo.png" width="24px" />
            <StyledInput
              disabled={!isConnectWallet}
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={onAmountChange}
            />
          </Flex>

          <Flex className="prefix">
            <Prefix>GLCH</Prefix>
            <Text color="#23353B" ml="12px" mr="12px">
              |
            </Text>
            <StyledMaxButton disabled={!isConnectWallet} onClick={onMaxClick}>
              <Text color="#00FFFF">Max</Text>
            </StyledMaxButton>
          </Flex>
        </Flex>
      </Wrapper>

      {/* Error box */}
      {hasError.min && (
        <Box pl="12px" mt="10px">
          <Text color="#D32029">Amount is less than min amount</Text>
        </Box>
      )}

      {hasError.max && (
        <Box pl="12px" mt="10px">
          <Text color="#D32029">Amount is greater than max amount</Text>
        </Box>
      )}

      {hasError.decimals && (
        <Box pl="12px" mt="10px">
          <Text color="#D32029">Cannot enter more than 18 decimal places.</Text>
        </Box>
      )}
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 16px;
  padding-left: 12px;
  padding-right: 12px;
  transition: all 0.5s;
  border: 1px solid ${({ error }) => (error ? "#D32029" : "#23353b")};

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .prefix {
    display: none;
  }

  @media ${breakPoints.device.lg} {
    .input-wrapper {
      display: flex;
      justify-content: space-between;
    }

    .prefix {
      display: flex;
    }
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-left: 12px;
  margin-right: 12px;
  background: transparent;
  outline: 0;
  border: none;
  color: #e4ecef;
  font-size: 16px;
  font-weight: 400;
  ::placeholder {
    color: #395660;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #395660;
  }

  ::-ms-input-placeholder {
    color: #395660;
  }

  ${({ disabled }) => disabled && "cursor: not-allowed"};
`;

const Prefix = styled(Text)`
  font-size: 16px;
  color: #4f7785;
`;

const StyledMaxButton = styled.button`
  padding-left: 8px;
  padding-right: 8px;
  background: transparent;
  outline: 0;
  border: 1px solid #00ffff;
  ${({ disabled }) => disabled && "cursor: not-allowed"};
`;
