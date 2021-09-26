import React from "react";
import PropTypes from "prop-types";

import { StyledText } from "./StyledText";

function Text({ children, ...props }) {
  return <StyledText {...props}>{children}</StyledText>;
}

Text.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  textTransform: PropTypes.string,
};

export default Text;
