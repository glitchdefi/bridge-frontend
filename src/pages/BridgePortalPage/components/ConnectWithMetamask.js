import React from "react";
import styled from "styled-components";

// Hooks
import { useConnectMetamask } from "../../../hooks/useConnectMetamask";
import { isMetamaskAvailable } from "../../../utils/utils";

// Components
import { Flex } from "../../../component/Box";
import { Button } from "../../../component/Button";
import { Text } from "../../../component/Text";

export function ConnectWithMetamask({ onShowInstallMetamaskModal }) {
  const onConnect = useConnectMetamask();

  return (
    <Button
      width="100%"
      variant="primary"
      onClick={() => {
        if (!isMetamaskAvailable()) {
          onShowInstallMetamaskModal();
          return;
        }

        onConnect();
      }}
    >
      <Flex>
        <img src="/images/metamask.png" width="16px" />
        <StyledText>Connect with Metamask</StyledText>
      </Flex>
    </Button>
  );
}

const StyledText = styled(Text)`
  color: #151f23;
  margin-left: 12px;
  font-weight: 600;
  font-size: 16px;
`;
