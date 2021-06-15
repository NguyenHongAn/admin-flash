import axiosClient from "../../api";
import URL from "../../api/URL";
import * as yup from "yup";

const Service = {
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Không đúng định dạng email")
      .required("Không được để trống"),
    phone: yup
      .string()
      .matches(/^[0-9]*$/gm, "Số điện thoại không chứa các ký tự")
      .required("Không được để trống"),
    fullname: yup.string().required("Không được để trống"),
    gender: yup.number().required("Không được để trống"),
  }),
  createNewShipper: ({ email, phone, fullname, gender }) => {
    return axiosClient.put(URL.GET_SHIPPERS, {
      email,
      phone,
      fullName: fullname,
      gender,
    });
  },
};
export default Service;
