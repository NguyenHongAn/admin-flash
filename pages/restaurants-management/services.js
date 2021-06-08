import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getCities: (city) => {
    return axiosClient.get(URL.GET_CITIES, {
      params: { city: city },
    });
  },
};

export default Service;
