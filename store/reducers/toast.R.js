import TAG from "../TAG";

const loadingState = { isHidden: true, type: "", msg: "" };

const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case TAG.TOAST.INFO:
      return {
        type: action.payload.type,
        msg: action.payload.msg,
        isHidden: false,
      };
    case TAG.TOAST.INVISIBLE:
      return {
        ...state,
        isHidden: true,
      };
    default:
      return state;
  }
};

export default loadingReducer;
