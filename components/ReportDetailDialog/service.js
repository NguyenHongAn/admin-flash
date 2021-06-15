import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getComplaintDetail: (id) => {
    return axiosClient.get(`${URL.GET_REPORT}/${id}`);
  },
  solveComplaint: (id) => {
    return axiosClient.put(`${URL.GET_REPORT}/${id}`);
  },
};
export default Service;
