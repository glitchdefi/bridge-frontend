import React from "react";

// Components
import { Flex } from "../../../Box";
import { Button } from "../../../Button";
import { Text } from "../../../Text";
import { useConnectMetamask } from "../../../../hooks/useConnectMetamask";

export function ConnectWithMetamask() {
  const onConnect = useConnectMetamask();

  return (
    <Button variant="secondary" onClick={onConnect}>
      <Flex>
        <img src="/images/metamask.png" width="16px" />
      </Flex>
      <Text ml="12px" color="#00FFFF" bold>
        Connect with Metamask
      </Text>
    </Button>
  );
}
