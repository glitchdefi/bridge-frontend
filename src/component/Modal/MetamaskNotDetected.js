import React from "react";
import { Modal } from "./Base/Modal";
import { ModalHeader } from "./Base/ModalHeader";
import { ModalBody } from "./Base/ModalBody";
import { Text } from "../Text";
import { Button } from "../Button";
import { Flex } from "../Box";

const CHROME_HREF =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

export function MetamaskNotDetectedModal(props) {
  return (
    <Modal {...props} centered>
      <ModalHeader title="MetaMask not detected" onClose={props.onHide} />
      <ModalBody>
        <Text>
          Please install Metamask extension in the Chrome browser. When it is
          ready, please refresh this page to continue. Thank you!
        </Text>

        <Flex width="100%" justifyContent="flex-start">
          <Button as="a" target="_blank" href={CHROME_HREF} mt="48px" variant="primary">
            Download MetaMask
          </Button>
        </Flex>
      </ModalBody>
    </Modal>
  );
}
