import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getCities: (city, token) => {
    return axiosClient.get(URL.GET_CITIES, {
      params: { city: city },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default Service;
