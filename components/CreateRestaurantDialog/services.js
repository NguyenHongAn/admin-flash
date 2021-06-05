import * as yup from "yup";
import axiosClient from "../../api";
import URL from "../../api/URL";
const service = {
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Không đúng định dạng email")
      .required("Không được để trống"),
    phone: yup
      .string()
      .matches(/^[0-9]*$/gm, "Số điện thoại không chứa các ký tự")
      .required("Không được để trống"),
    restaurantName: yup.string().required("Không được để trống"),
    address: yup.string().required("Không được để trống"),
    ward: yup.string().required("Không được để trống"),
    district: yup.string().required("Không được để trống"),
    city: yup.string().required("Không được để trống"),
  }),
  createNewRestaurant: (
    email,
    phone,
    restaurantName,
    address,
    city,
    ward,
    district,
    openTime,
    closeTime,
    partner
  ) => {
    return axiosClient.post(URL.CREATE_RESTAURANT, {
      email,
      contractID: phone,
      name: restaurantName,
      address,
      city,
      ward,
      district,
      openTime,
      closeTime,
      partner,
    });
  },
};

export default service;
