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
    password: yup.string().min(6, "mật khẩu nên dài hơn 6 ký tự"),
    restaurantName: yup.string().required("Không được để trống"),
    address: yup.string().required("Không được để trống"),
    ward: yup.string().required("Không được để trống"),
    district: yup.string().required("Không được để trống"),
    city: yup.string().required("Không được để trống"),
  }),
  createNewRestaurant: ({
    email,
    phone,
    password,
    restaurantName,
    address,
    city,
    ward,
    district,
    cityID,
    districtID,
    openAt,
    closeAt,
    parkingFee,
  }) => {
    console.log({
      email,
      phone,
      password,
      restaurantName,
      address,
      city,
      ward,
      district,
      cityID,
      districtID,
      openAt,
      closeAt,
      parkingFee,
    });
    return axiosClient.post(URL.CREATE_RESTAURANT, {
      email,
      contractID: phone,
      name: restaurantName,
      password,
      address,
      city,
      cityID,
      districtID,
      ward,
      district,
      openAt,
      closeAt,
      parkingFee,
    });
  },
};

export default service;
