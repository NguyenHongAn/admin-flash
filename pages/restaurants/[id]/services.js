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
  getRestaurantInfo: (id, token) => {
    return axiosClient.get(`${URL.GET_RESTAURANTS_INFO}/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  updateAddress: ({ address, ward, district, city, id }) => {
    console.log({ address, ward, district, city });
    return axiosClient.put(`${URL.GET_RESTAURANTS_INFO}/${id}/address`, {
      address,
      ward,
      district,
      city,
    });
  },

  updateInfo: ({
    restaurantName,
    openAt,
    closeAt,
    anouncement,
    resPhone,
    id,
    avatar,
    isChange,
    token,
  }) => {
    const formData = new FormData();
    formData.append("name", restaurantName);
    formData.append("openAt", openAt);
    formData.append("closeAt", closeAt);
    formData.append("anouncement", anouncement);
    formData.append("phone", resPhone);
    if (isChange) formData.append("avatar", avatar);

    return axiosClient({
      method: "PUT",
      url: `${URL.GET_RESTAURANTS_INFO}/${id}/info`,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  },

  addPermision: ({ fullname, phone, email, id, manager }) => {
    return axiosClient.put(`${URL.GET_RESTAURANTS_INFO}/${id}/permision`, {
      fullname,
      phone,
      email,
      managerID: manager,
    });
  },
  stopRestaurantService: (id) => {
    return axiosClient.delete(`${URL.GET_RESTAURANTS_INFO}/${id}`);
  },
};
export default services;
