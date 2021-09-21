import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useClipboard } from "use-clipboard-copy";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { get } from "lodash";

import { BSC_EXPLORER, ETH_EXPLORER } from "../../_configs";

// Components
import { Text } from "../Text";
import { Modal } from "./Base/Modal";
import { Flex } from "../Box";
import { ACTION_CONST } from "../../constants";
import { CopyIcon } from "../Svg";
import { Button } from "../Button";
import { useLogout } from "../../hooks/useLogout";
import { ModalHeader } from "./Base/ModalHeader";
import { ModalBody } from "./Base/ModalBody";

export function WalletInfo(props) {
  const dispatch = useDispatch();
  const clipboard = useClipboard({
    copiedTimeout: 600,
  });
  const { onLogout } = useLogout();

  const walletAddress = useSelector((state) =>
    get(state, "utils.walletAddress", false)
  );

  const handleLogout = () => {
    onLogout();
    props.onHide();
    dispatch({
      type: ACTION_CONST.LOG_OUT_WALLET_SUCCESS,
    });

    window.location.reload();
  };

  return (
    <Modal {...props} centered>
      <ModalHeader title="Your Wallet" onClose={props.onHide} />
      <ModalBody>
        <Flex>
          <Text mr="12px" size="16px" bold>
            {walletAddress}
          </Text>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="copy-address">
                {clipboard.copied ? "Copied" : "Copy"}
              </Tooltip>
            }
          >
            <Button onClick={() => clipboard.copy(walletAddress)}>
              <CopyIcon />
            </Button>
          </OverlayTrigger>
        </Flex>

        <Flex width="100%" mt="32px">
          <Button
            as="a"
            href={`${BSC_EXPLORER}/address/${walletAddress}`}
            target="_blank"
            width="100%"
            variant="secondary"
          >
            View on BscScan
          </Button>
          <Button
            as="a"
            href={`${ETH_EXPLORER}/address/${walletAddress}`}
            target="_blank"
            width="100%"
            ml="16px"
            variant="secondary"
          >
            View on EthScan
          </Button>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button width="100%" onClick={handleLogout}>
          <Text color="#00FFFF">Logout</Text>
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const ModalFooter = styled.div`
  border-top: 1px solid #23353b;
  padding: 1em;
  background-color: #151f23;
`;
