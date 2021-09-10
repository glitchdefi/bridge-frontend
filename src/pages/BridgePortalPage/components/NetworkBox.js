import React from "react";
import styled from "styled-components";

import breakPoints from "../../../utils/breakPoints";

// Components
import { Flex } from "../../../component/Box";
import { Text } from "../../../component/Text";

export function NetworkBox({ label, network, showBalance = true }) {
  const { id, name } = network || {};

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Flex mt="12px">
        <img width="24px" src={`/images/networks/${id}-icon.svg`} />
        <NetworkName>{name}</NetworkName>
      </Flex>
      {showBalance && (
        <Flex mt="12px">
          <BalanceWrapper>
            <Text color="#4F7785">Balance:</Text>
            <Balance>0.00</Balance>
            <Prefix>GLCH</Prefix>
          </BalanceWrapper>
        </Flex>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  border: 1px solid #23353b;
  min-height: 120px;

  @media ${breakPoints.device.md} {
    min-height: auto;
  }
`;

const BalanceWrapper = styled(Flex)`
  width: 100%;
  border-top: 1px solid #23353b;
  padding-top: 12px;
`;

const Label = styled(Text)`
  font-size: 12px;
  color: #4f7785;
`;

const NetworkName = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;

  @media ${breakPoints.device.md} {
    font-size: 18px;
  }
`;

const Balance = styled(Text)`
  margin-left: 4px;
`;

const Prefix = styled(Text)`
  color: #a7c1ca;
  margin-left: 4px;
`;
