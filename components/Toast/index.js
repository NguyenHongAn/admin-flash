import React, { useEffect } from "react";
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

function Toast() {
  const { isHidden, type, content } = useSelector((state) => ({
    type: state.toast.type,
    content: state.toast.msg,
    isHidden: state.toast.isHidden,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
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
    return () => {
      setTimeout(() => {
        dispatch(ToastAction.turnOff());
      }, 1500);
    };
  }, [isHidden, dispatch]);

  return !isHidden ? (
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
