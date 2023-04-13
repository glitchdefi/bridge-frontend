import React from "react";

// Components
import { Modal } from "../../../Modal/Base/Modal";
import { ModalHeader } from "../../../Modal/Base/ModalHeader";
import { ModalBody } from "../../../Modal/Base/ModalBody";
import { baseUrl, configuration } from "./configs";

export function VoyagerModal(props) {
  const paramString = new URLSearchParams(configuration).toString();

  return (
    <Modal {...props} centered>
      <ModalHeader title="Voyager" onClose={props.onHide} />
      <ModalBody style={{ padding: 0 }}>
        <iframe
          id="widget__iframe"
          src={`${baseUrl}?${paramString}`}
          height="700px"
          width="600px"
          title="widget__iframe"
        />
      </ModalBody>
    </Modal>
  );
}
