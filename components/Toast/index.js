import React from "react";
import { toast, ToastContainer } from "react-toastify";

function getToastType(type) {
  switch (type) {
    case "error":
      return toast.TYPE.ERROR;
    case "success":
      return toast.TYPE.SUCCESS;
    case "info":
      return toast.TYPE.INFO;
    case "dark":
      return toast.TYPE.DARK;
    case "warning":
      return toast.TYPE.WARNING;
    default:
      break;
  }
}

function Toast({ type, content }) {
  toast(content, {
    type: getToastType(type),
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
export default Toast;
