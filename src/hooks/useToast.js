import { useContext } from "react";
import { ToastsContext } from "../contexts/ToastsContext";

export const useToast = () => {
  const toastContext = useContext(ToastsContext);

  if (toastContext === undefined) {
    throw new Error("Toasts context undefined");
  }

  const {
    toasts,
    clear,
    remove,
    toastError,
    toastInfo,
    toastSuccess,
    toastWarning,
  } = toastContext;

  return {
    toasts,
    clear,
    remove,
    toastError,
    toastInfo,
    toastSuccess,
    toastWarning,
  };
};
