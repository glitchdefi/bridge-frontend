import React from "react";
import styled from "styled-components";

import { helpers } from "../../../../utils/helpers";
import { Button } from "../../../Button";
import { Text } from "../../../Text";

export function WalletAddress({ address, currentNetWorkId, onShowWalletInfo }) {
  const network =
    currentNetWorkId === 97 || currentNetWorkId === 56 ? "bsc" : "eth";

  return (
    <Button width="100%" variant="secondary" onClick={onShowWalletInfo}>
      <Wrapper>
        <img width="16px" src="/images/metamask.png" />
        <Text>{helpers.formatTransactionHash(address, 8, 8)}</Text>
        <Tag isBSC={network === "bsc"}>
          <Text color={network === "bsc" ? "black" : undefined}>
            {network?.toUpperCase()}
          </Text>
        </Tag>
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

const Tag = styled.div`
  padding: 0px 8px;
  background-color: ${({ isBSC }) => (isBSC ? "rgb(248, 209, 47)" : "#00b3b3")};
  margin-left: 12px;
`;
