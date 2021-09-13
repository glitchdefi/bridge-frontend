import React from "react";
import styled from "styled-components";

export function Spinner() {
  return (
    <Wrapper>
      <div className="loader" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .loader {
    font-size: 10px;
    text-indent: -9999em;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #00FFFF;
    background: -moz-linear-gradient(
      left,
      #00FFFF 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      #00FFFF 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -o-linear-gradient(
      left,
      #00FFFF 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: -ms-linear-gradient(
      left,
      #00FFFF 10%,
      rgba(255, 255, 255, 0) 42%
    );
    background: linear-gradient(
      to right,
      #00FFFF 10%,
      rgba(255, 255, 255, 0) 42%
    );
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #00FFFF;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #151f23;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
