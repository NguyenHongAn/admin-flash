import axiosClient from "../../api";
import URL from "../../api/URL";
import * as yup from "yup";
const Service = {
  validationSchema: yup.object({
    shipperPercent: yup.number().min(0, "Phần trăm phí dich vụ không thể âm"),
    merchantPercent: yup.number().min(0, "Phần trăm phí dich vụ không thể âm"),
    delayDay: yup.number().min(0, "Ngày trả phí không thể âm"),
  }),
  getSetting: () => {
    return axiosClient.get(URL.GET_SETTING);
  },
  updateSetting: ({
    id,
    shipperPercent,
    merchantPercent,
    delayDay,
    shippingFee,
  }) => {
    shippingFee = shippingFee.filter(
      (obj) =>
        typeof obj.MaxDistance !== "undefined" && typeof obj.Fee !== "undefined"
    );
    console.log(typeof shippingFee.MaxDistance);
    return axiosClient.put(URL.GET_SETTING, {
      id,
      shipperPercent,
      merchantPercent,
      delayDay,
      shippingFee,
    });
  },
};
export default Service;
