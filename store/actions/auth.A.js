import TAG from "../TAG";

const authAction = {
  signIn: (token) => ({
    type: TAG.AUTH.VISIBLE,
    payload: token,
  }),
  signOut: () => ({
    type: TAG.AUTH.SIGNOUT,
  }),
};

export default authAction;
