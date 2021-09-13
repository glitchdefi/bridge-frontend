import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";

export function Logo() {
  return (
    <Wrapper to={ROUTES.HOMEPAGE}>
      <StyledLogo src="/images/dark_logo.png" alt="glitch-logo" />
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled.img`
  width: 125px;
`;
