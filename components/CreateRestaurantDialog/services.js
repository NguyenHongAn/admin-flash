import * as yup from "yup";
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
    address: yup.string().required("Không được để trống"),
    ward: yup.number().required("Không được để trống"),
    district: yup.number().required("Không được để trống"),
    city: yup.number().required("Không được để trống"),
  }),
};

export default service;
