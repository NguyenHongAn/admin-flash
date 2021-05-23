import TAG from "../TAG";

const authAction = {
  signIn: (token) => ({
    type: TAG.AUTH.SIGN_IN,
    payload: token,
  }),
  signOut: () => ({
    type: TAG.AUTH.SIGN_OUT,
  }),
};

export default authAction;
