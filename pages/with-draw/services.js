import axiosClient from "../../api";
import URL from "../../api/URL";

const Service = {
  getWithDrawList: (page, phone, token) => {
    return axiosClient.get(URL.GET_WITHDRAW, {
      params: { page, phone },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  solveWithDraw: (id) => {
    return axiosClient.post(URL.GET_WITHDRAW, {
      id: id,
    });
  },
  cancelWithDraw: (id) => {
    return axiosClient.post(`${URL.GET_WITHDRAW}/cancel`, {
      id: id,
    });
  },
  getStatus: (status) => {
    switch (status) {
      case -1:
        return "Chưa giải quyết";
      case 1:
        return "Đã giải quyết";
      case 0:
        return "Đã hủy";
      default:
        return "Chưa giải quyết";
    }
  },
};

export default Service;
