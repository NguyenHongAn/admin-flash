import "../assets/css/globals.css";
import "../assets/css/login.css";
import "../assets/css/restaurant.css";
import "../assets/css/user.css";
import "../assets/css/listReport.css";
import "swiper/swiper-bundle.css";
import "react-toastify/dist/ReactToastify.css";

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
