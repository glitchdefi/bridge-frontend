import React from "react";
import StyledButton from "./StyledButton";

function Button(props) {
  const { className, isLoading, children, variant, onClick, ...rest } = props;

  return (
    <StyledButton
      variant={variant}
      onClick={(e) => variant !== "disable" && onClick && onClick(e)}
      {...rest}
    >
      <div className="btn-wrap">{children}</div>
    </StyledButton>
  );
}

Button.defaultProps = {};

export default Button;
