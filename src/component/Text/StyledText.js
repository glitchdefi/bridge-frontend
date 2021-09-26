import styled from "styled-components";
import { space, textStyle } from "styled-system";

export const StyledText = styled.div`
  color: ${({ color }) => color || "#E4ECEF"};
  font-size: ${({ size }) => size || "14px"};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  word-break: break-word;
  text-transform: ${({ textTransform }) => textTransform};
  font-family: IBM Plex Mono;
  ${space}
  ${textStyle}
`;
