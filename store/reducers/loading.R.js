import TAG from "../TAG";

const loadingState = false;

const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case TAG.LOADING.VISIBLE:
      return true;
    case TAG.LOADING.INVISIBLE:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
