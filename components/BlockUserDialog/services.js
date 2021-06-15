import axiosClient from "../../api";
import URL from "../../api/URL";

const services = {
  blockUserAccount: (userID, reason, role) => {
    const url = role === "user" ? URL.GET_USERS : URL.GET_SHIPPERS;
    return axiosClient.put(`${url}/${userID}/block`, {
      id: userID,
      reason,
    });
  },
  reasons: [
    { label: "Tài khoản có khả năng bị hack", value: 0 },
    { label: "Khiếu nại không đúng quá nhiều lần", value: 1 },
    { label: "Khóa do vi phạm", value: 2 },
    { label: "Khác", value: 3 },
  ],
};
export default services;
