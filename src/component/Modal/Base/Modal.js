import React from "react";
import styled from "styled-components";
import { Modal as RBModal } from "react-bootstrap";

export function Modal({ children, ...rest }) {
  return <StyledModal {...rest}>{children}</StyledModal>;
}

const StyledModal = styled(RBModal)`
  .modal-content {
    border-radius: 0px;
  }

  @media (min-width: 576px) {
    .modal-dialog {
      max-width: 600px;
    }
  }
`;
