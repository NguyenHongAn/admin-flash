import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getRestaurantMangagementInfo: ({ city, search, page, district, partner }) => {
    console.log({ city, search, page, district, partner });
    return axiosClient.get(URL.GET_RESTAURANTS_INFO, {
      params: { city: city, search: search, page: page, district, partner },
    });
  },
};

export default Service;
