import axiosClient from "../../api";
import URL from "../../api/URL";
import { Icon } from "@iconify/react";
import personLock16Regular from "@iconify/icons-fluent/person-lock-16-regular";

const services = {
  getShipperManagement: (page, email, phone, token) => {
    return axiosClient.get(URL.GET_SHIPPERS, {
      params: { page, email, phone },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  paymentForServiceFee: (id) => {
    return axiosClient.post(`${URL.GET_SHIPPERS}/pay-receipt`, { id });
  },
  getStatus: (num) => {
    switch (num) {
      case -2:
        return (
          <Icon
            icon={personLock16Regular}
            style={{ color: "black", fontSize: "24px" }}
          ></Icon>
        );
      case -1:
        return "Chưa xác thực";
      case 0:
        return "Bình thường";

      default:
        break;
    }
  },
};

export default services;
