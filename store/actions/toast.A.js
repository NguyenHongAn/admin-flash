import TAG from "../TAG";

const ToastAction = {
  turnOff: () => ({
    type: TAG.TOAST.INVISIBLE,
  }),
  displayInfo: (type, msg) => ({
    type: TAG.TOAST.INFO,
    payload: {
      type,
      msg,
    },
  }),
};
export default ToastAction;
