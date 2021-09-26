import React from "react";
import { ToastContainer } from "./ToastContainer";
import { useToast } from "../../hooks/useToast";

export const ToastListener = () => {
  const { toasts, remove } = useToast();

  const handleRemove = (id) => remove(id);

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />;
};
