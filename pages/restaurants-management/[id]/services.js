import axiosClient from "../../../api";
import URL from "../../../api/URL";
import * as Yup from "yup";

const services = {
  infoSchema: Yup.object({
    restaurantName: Yup.string().required("tên nhà hàng không thể để trống"),
  }),
  addressSchema: Yup.object({
    address: Yup.string().required("địa chỉ nhà hàng không thể để trống"),
    ward: Yup.string().required("địa chỉ nhà hàng không thể để trống"),
    district: Yup.string().required("địa chỉ nhà hàng không thể để trống"),
    city: Yup.string().required("địa chỉ nhà hàng không thể để trống"),
  }),
  permisionSchema: Yup.object({}),
  getRestaurantInfo: (id) => {
    return axiosClient.get(`${URL.GET_RESTAURANTS_INFO}/${id}`);
  },
};
export default services;
