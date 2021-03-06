import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getRestaurantMangagementInfo: ({ city, search, page, district, partner }) => {
    return axiosClient.get(URL.GET_RESTAURANTS_INFO, {
      params: { city: city, search: search, page: page, district, partner },
    });
  },
  handleRecallPermission: (id) => {
    return axiosClient.put(`${URL.GET_RESTAURANTS_INFO}/${id}/recall`);
  },
  paymentForServiceFee: (id) => {
    return axiosClient.post(`${URL.GET_RESTAURANTS_INFO}/pay-receipt`, { id });
  },
};

export default Service;
