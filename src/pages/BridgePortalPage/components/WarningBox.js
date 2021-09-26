import React from "react";
import styled from "styled-components";
import { Flex } from "../../../component/Box";
import { InfoIcon } from "../../../component/Svg";
import { Text } from "../../../component/Text";

export function WarningBox({ min, max }) {
  return (
    <WarningWrapper>
      <InfoIcon width="16px" />
      <StyledText>
        The minimum amount is {min} GLCH and the maximum is {max} GLCH.
      </StyledText>
    </WarningWrapper>
  );
}

const WarningWrapper = styled(Flex)`
  margin-top: 16px;
  background-color: #1c2a2f;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledText = styled(Text)`
  font-size: 12px;
  color: #a7c1ca;
  margin-left: 12px;
`;
