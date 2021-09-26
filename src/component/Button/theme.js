import { css } from "styled-components";
import { variants } from "./types";

export const styleVariants = (theme, variant) =>
  ({
    [variants.PRIMARY]: css`
      .btn-wrap {
        background-color: #e4ecef;
        color: #151f23;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 8px 48px;
      }
      &:before,
      &:after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 0;
        transition: all ease-in-out 0.2s;
      }
      &:before {
        background-color: #f100f5;
        top: -1px;
        left: 4px;
      }
      &:after {
        background-color: #00ffff;
        top: 3px;
        left: -3px;
      }
      &:hover {
        &:before {
          left: 7px;
          opacity: 0.7;
          filter: blur(1px);
        }
        &:after {
          left: -6px;
          opacity: 0.7;
          filter: blur(1px);
        }
      }
    `,
    [variants.SECONDARY]: css`
      .btn-wrap {
        border: 1px solid #00ffff;
        color: #00ffff;
        font-weight: 600;
        display: flex;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 5px 16px;
      }
    `,
    [variants.CANCEL]: css`
      .btn-wrap {
        border: 1px solid ${theme.color4};
        color: ${theme.color1};
        font-weight: 600;
        display: flex;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 8px 48px;
      }
    `,
    [variants.DISABLE]: css`
      cursor: not-allowed !important;
      background-color: rgba(228, 236, 239, 0.3);
      color: #395660;
      font-weight: 600;
      padding: 8px 48px;
    `,
  }[variant]);
