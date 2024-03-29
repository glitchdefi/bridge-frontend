import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import { Alert } from "../Alert";

export const Toast = ({ toast, onRemove, style, ttl, ...props }) => {
  const timer = useRef();
  const ref = useRef(null);
  const removeHandler = useRef(onRemove);
  const { id, title, description, type } = toast;

  const handleRemove = useCallback(
    () => removeHandler.current(id),
    [id, removeHandler]
  );

  const handleMouseEnter = () => {
    clearTimeout(timer.current);
  };

  const handleMouseLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, ttl);
  };

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, ttl);

    return () => {
      clearTimeout(timer.current);
    };
  }, [timer, ttl, handleRemove]);

  return (
    <CSSTransition nodeRef={ref} timeout={250} style={style} {...props}>
      <StyledToast
        refs={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Alert title={title} variant={type} onClick={handleRemove}>
          {description}
        </Alert>
      </StyledToast>
    </CSSTransition>
  );
};

const StyledToast = styled.div`
  right: 16px;
  position: fixed;
  max-width: calc(100% - 32px);
  transition: all 250ms ease-in;
  width: 100%;

  @media (min-width: 640px) {
    max-width: 400px;
  }
`;
