import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { get } from "lodash";

import breakPoints from "../../../utils/breakPoints";

// Components
import { Box, Flex } from "../../../component/Box";
import { Text } from "../../../component/Text";

export function AmountInput({ value, min, onChange }) {
  const [amount, setAmount] = useState(value || "");
  const [hasError, setHasError] = useState(false);

  const isConnectWallet = useSelector((state) =>
    get(state, "utils.isConnectWallet", false)
  );

  const glitchBalance = useSelector((state) =>
    get(state, "utils.glitchBalance", 0)
  );

  useEffect(() => {
    if (Number(amount) > 0) {
      setHasError(Number(amount) < Number(min));
      onChange(amount);
    } else {
      setHasError(false);
    }
  }, [amount]);

  const onAmountChange = (e) => {
    const value = e.target.value;

    if (Number(value) > Number(glitchBalance)) {
      setAmount(glitchBalance);
    } else {
      setAmount(value);
    }
  };

  const onMaxClick = () => {
    setAmount(glitchBalance);
  };

  return (
    <>
      <Wrapper error={hasError}>
        <Flex className="input-wrapper">
          <Flex>
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
      {hasError && (
        <Box pl="12px" mt="10px">
          <Text color="#D32029">Amount is less than min amount</Text>
        </Box>
      )}
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
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
