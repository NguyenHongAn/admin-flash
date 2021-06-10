import TAG from "../TAG";
const INITIAL_STATE = {
  jwt: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.AUTH.SIGN_IN:
      console.log(action.payload);
      return {
        jwt: action.payload,
      };
    case TAG.AUTH.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default authReducer;
