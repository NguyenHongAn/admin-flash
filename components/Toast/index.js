import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ToastAction from "../../store/actions/toast.A";

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
  const { isHidden, typeR, contentR } = useSelector((state) => ({
    typeR: state.toast.type,
    contentR: state.toast.msg,
    isHidden: state.toast.isHidden,
  }));

  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(ToastAction.turnOff());
  }, 2000);
  toast(contentR, {
    type: getToastType(typeR),
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return isHidden ? (
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
  ) : (
    <div></div>
  );
}
export default Toast;
