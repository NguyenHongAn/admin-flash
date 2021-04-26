import "../styles/globals.css";
import "./css/login.css";
import "./css/sidebar.css";
import "./css/notification.css";
import "./css/statistics.css";
import "./css/restaurant.css";

import { Provider } from "react-redux";
import store from "../store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
