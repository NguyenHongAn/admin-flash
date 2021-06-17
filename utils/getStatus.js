import { Icon } from "@iconify/react";
import personLock16Regular from "@iconify/icons-fluent/person-lock-16-regular";

export function getReceiptStatus(status) {
  switch (status) {
    case -1:
      return "Chưa thanh toán";
    case 1:
      return "Đã thanh toán";
    //case 0: return 'Chưa tín'
    default:
      return "Đã thanh toán";
  }
}

export function getAccountStatus(num) {
  switch (num) {
    case -2:
      return (
        <Icon
          icon={personLock16Regular}
          style={{ color: "black", fontSize: "24px" }}
        ></Icon>
      );
    case -1:
      return "Chưa xác thực";
    case 0:
      return "Bình thường";

    default:
      break;
  }
}

export function getGender(gender) {
  switch (gender) {
    case 0:
      return "Chưa rõ";
    case 1:
      return "Nam";
    case 2:
      return "Nữ";
    case 3:
      return "Khác";
  }
}
