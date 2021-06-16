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
  updateSetting: ({ id, shipperPercent, merchantPercent, delayDay }) => {
    return axiosClient.put(URL.GET_SETTING, {
      id,
      shipperPercent,
      merchantPercent,
      delayDay,
    });
  },
};
export default Service;
