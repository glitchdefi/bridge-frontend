import React from "react";
import styled from "styled-components";
import { Hamburger } from "../../Svg";
import breakPoints from "../../../utils/breakPoints";

export function NavBarToggler() {
  return (
    <Wrapper>
      <StyledButton
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <Hamburger />
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;

  @media ${breakPoints.device.lg} {
    display: none;
  }
`;

const StyledButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
`;
