import TAG from "../TAG";

const loadingAction = {
  turnOnLoading: () => ({
    type: TAG.LOADING.VISIBLE,
  }),
  turnOffLoading: () => ({
    type: TAG.LOADING.INVISIBLE,
  }),
};

export default loadingAction;
