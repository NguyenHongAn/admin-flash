import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getRestaurantMangagementInfo: ({ city, search, page, district, partner }) => {
    return axiosClient.get(URL.GET_RESTAURANTS_INFO, {
      params: { city: city, search: search, page: page, district, partner },
    });
  },
  stopRestaurantService: (id) => {
    return axiosClient.delete(`${URL.GET_RESTAURANTS_INFO}/${id}`);
  },
};

export default Service;
