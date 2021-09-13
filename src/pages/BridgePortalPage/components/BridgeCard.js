import React from "react";
import styled from "styled-components";

// Components
import { Text } from "../../../component/Text";

export function BridgeCard({ children }) {
  return (
    <CardWrapper>
      <CardTitle>
        <Text>Glitch Bridge</Text>
      </CardTitle>
      <CardBody>{children}</CardBody>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #151f23;
`;

const CardTitle = styled.div`
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #1c2a2f;
  border-bottom: 1px solid #23353b;
`;

const CardBody = styled.div`
  padding: 32px;
`;
