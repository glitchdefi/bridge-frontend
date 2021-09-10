import { SuccessIcon, InfoIcon, ErrorIcon, DangerIcon } from "./icons";
import { variants } from "./types";

export const getThemeColor = ({ variant = variants.INFO }) => {
  switch (variant) {
    case variants.DANGER:
      return "#D32029";
    case variants.WARNING:
      return "";
    case variants.SUCCESS:
      return "#49AA19";
    case variants.INFO:
    default:
      return "";
  }
};

export const getIcon = (variant = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return DangerIcon;
    case variants.WARNING:
      return ErrorIcon;
    case variants.SUCCESS:
      return SuccessIcon;
    case variants.INFO:
    default:
      return InfoIcon;
  }
};
