import { useEffect } from "react";
import { useToast } from "./useToast";

export function useToastError(title, error) {
  const { toastError } = useToast();

  useEffect(() => {
    if (error) {
      toastError(title || "Error", error?.message || error);
    }
  }, [error]);
}
