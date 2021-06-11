// set up redux
import { createStore, combineReducers, compose } from "redux";
import loadingReducer from "./reducers/loading.R";
import authReducer from "./reducers/auth.R";
import toastReducer from "./reducers/toast.R";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  toast: toastReducer,
});

const store = createStore(reducer, composeEnhancers());

export default store;

//==== user Context =========================
// export const StateContext = createContext();
// //create provider
// export const StateProvider = ({ reducer, initialState, children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const value = { state, dispatch };
//   console.log({ value });
//   return (
//     <StateContext.Provider value={value}>{children}</StateContext.Provider>
//   );
// };

// export const useStateValue = () => useContext(StateContext);
