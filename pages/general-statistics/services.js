import axiosClient from "../../api";
import URL from "../../api/URL";

const services = {
  getGeneralStatistics: () => {
    return axiosClient.get(URL.GET_GENERAL_INFO);
  },
};

export default services;
