import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getListReport: (page, token) => {
    return axiosClient.get(URL.GET_REPORT, {
      params: { page },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};
export default Service;
