const SERVER_ERROR = {
  400: "Yêu cầu gửi tới Server không chứa các tham số hợp lệ",
  401: "Chưa có quyền truy cập",
  403: "Truy cập bị từ chối (ví dụ ip bị chặn)",
  404: "Yêu cầu không tìm thấy",
  500: "Server đang bị lỗi",
};

const EXECUTION_ERROR = {
  20: "Có lỗi khi gọi API hỗ trợ từ bên ngoài",
  100: "Server gặp lỗi khi tạo nhà hàng",
  101: "Lỗi khi lấy danh sách nhà hàng",
  110: "lỗi khi lấy danh sách người dùng",
};
const ErrorCollection = {
  SERVER: SERVER_ERROR,
  EXECUTION: EXECUTION_ERROR,
  SUCCESS: {
    0: "Thành công",
  },
};

export default ErrorCollection;
