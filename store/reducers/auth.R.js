import TAG from "../TAG";
const INITIAL_STATE = {
  jwt: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.AUTH.SIGNIN:
      return {
        ...state,
        jwt: action.payload,
      };
    case TAG.AUTH.SIGNOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default authReducer;
