import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { Text } from "../Text";

import { CloseIcon } from "../Svg";
import { getThemeColor, getIcon } from "./utils";

export const Alert = ({ title, children, variant, onClick }) => {
  const Icon = getIcon(variant);

  return (
    <StyledAlert variant={variant}>
      <IconLabel variant={variant} hasDescription={!!children}>
        <Icon color="currentColor" width="24px" />
      </IconLabel>

      <Details hasHandler={!!onClick}>
        <Text bold size="14px" mb="5px" color={getThemeColor({ variant })}>
          {title}
        </Text>
        {typeof children === "string" ? (
          <Text size="14px">{children}</Text>
        ) : (
          children
        )}
      </Details>

      {onClick && (
        <CloseHandler>
          <Button onClick={onClick}>
            <CloseIcon width="24px" color="#4F7785" />
          </Button>
        </CloseHandler>
      )}
    </StyledAlert>
  );
};

const StyledAlert = styled.div`
  display: flex;
  position: relative;
  background-color: #151f23;
  border: 1px solid ${({ variant }) => getThemeColor({ variant })};
`;

const IconLabel = styled.div`
  color: ${({ variant }) => getThemeColor({ variant })};
  padding: 12px 12px 12px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Details = styled.div`
  flex: 1;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: ${({ hasHandler }) =>
    hasHandler ? `${withHandlerSpacing}px` : "12px"};
  padding-top: 12px;
`;

const withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position

const CloseHandler = styled.div`
  border-radius: 0 16px 16px 0;
  right: 8px;
  position: absolute;
  top: 8px;
`;
