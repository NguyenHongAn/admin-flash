import axiosClient from "../../api";
import URL from "../../api/URL";

const services = {
  getUserManagement: (page, email, phone) => {
    return axiosClient.get(URL.GET_USERS, {
      params: { page, email, phone },
    });
  },
};

export default services;
