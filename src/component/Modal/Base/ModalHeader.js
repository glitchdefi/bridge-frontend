import React from "react";
import styled from "styled-components";

// Components
import { Text } from "../../Text";
import { Flex } from "../../Box";
import { CloseIcon } from "../../Svg";
import { Button } from "../../Button";

export function ModalHeader({ title, onClose }) {
  return (
    <Wrapper>
      <Flex alignItems="center" justifyContent="space-between">
        <Text size="16px">{title}</Text>
        <Button onClick={onClose}>
          <CloseIcon width="24px" color="#00FFFF" />
        </Button>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1em;
  text-align: center;
  background-color: #1c2a2f;
  border-bottom: 1px solid #23353b;
`;
