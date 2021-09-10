import React from "react";
import styled from "styled-components";

// Components
import { Button } from "../../../component/Button";
import { Text } from "../../../component/Text";

export function TransferButton({ disabled, ...rest }) {
  return (
    <Button width="100%" variant={disabled ? "disable" : "primary"} {...rest}>
      <StyledText>Transfer</StyledText>
    </Button>
  );
}

const StyledText = styled(Text)`
  color: #151f23;
  margin-left: 12px;
  font-weight: 600;
  font-size: 16px;
`;
