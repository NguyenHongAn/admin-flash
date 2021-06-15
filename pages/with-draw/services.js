import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getWithDrawList: (page, token) => {
    return axiosClient.get(URL.GET_WITHDRAW, {
      params: { page },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default Service;
