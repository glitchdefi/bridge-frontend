import React from "react";

// Components
import { Flex } from "../../../Box";
import { Button } from "../../../Button";
import { Text } from "../../../Text";
import { useConnectMetamask } from "../../../../hooks/useConnectMetamask";
import { USER_LOGOUT_KEY } from "../../../../hooks/useLogout";

export function ConnectWithMetamask() {
  const onConnect = useConnectMetamask();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        window.localStorage.setItem(USER_LOGOUT_KEY, false);
        onConnect();
      }}
    >
      <Flex>
        <img src="/images/metamask.png" width="16px" />
      </Flex>
      <Text ml="12px" color="#00FFFF" bold>
        Connect with Metamask
      </Text>
    </Button>
  );
}
