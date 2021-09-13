import styled from "styled-components";
import { color, layout, space } from "styled-system";
import { styleVariants } from "./theme";

const StyledButton = styled.button`
  background-color: transparent;
  border: 0;
  border-radius: 0;
  position: relative;
  padding: 0;
  outline: none !important;
  box-shadow: none !important;
  pointer-events: all;
  text-decoration: none;
  ${({ theme, variant }) => styleVariants(theme, variant)}
  ${space}
  ${layout}
  ${color}
`;

export default StyledButton;
