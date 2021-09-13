import React from "react";
import styled from "styled-components";
import { helpers } from "../../../../utils/helpers";
import { Button } from "../../../Button";
import { Text } from "../../../Text";

export function Balance({ value }) {
  return (
    <Button width="100%" variant="secondary">
      <Wrapper>
        <img width="18px" src="/images/small_logo.png" />
        <Text>{helpers.formatNumberDownRoundWithExtractMax(value, 8)}</Text>
        <StyledPrefix color="#a8c2cb">GLCH</StyledPrefix>
      </Wrapper>
    </Button>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 12px;
  }
`;

const StyledPrefix = styled(Text)`
  margin-left: 12px;
`;
