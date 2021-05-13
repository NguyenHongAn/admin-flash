import "../styles/globals.css";
import "../styles/login.css";
import "../styles/sidebar.css";
import "../styles/notification.css";
import "../styles/restaurant.css";
import "../styles/statistics.css";
import "../styles/user.css";
import "../styles/listReport.css";
import "swiper/swiper-bundle.css";

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
