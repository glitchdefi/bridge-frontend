import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Svg = ({ width, height, children, ...props }) => {
  return (
    <Wrapper width={width} height={height} {...props}>
      {children}
    </Wrapper>
  );
};

Svg.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.any.isRequired,
};

const Wrapper = styled.svg`
  fill: ${({ color }) => color};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  flex-shrink: 0;
`;

export default Svg;
