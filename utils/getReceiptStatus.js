function getReceiptStatus(status) {
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

export default getReceiptStatus;
