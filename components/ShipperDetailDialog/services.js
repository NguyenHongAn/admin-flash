import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  handleBoomOrder: (orderID, id) => {
    return axiosClient.post(`${URL.GET_SHIPPERS}/${id}`, { orderID });
  },
};
export default Service;
