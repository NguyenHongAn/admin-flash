const SERVER_ERROR = {
  400: "Yêu cầu không chứa các tham số hợp lệ",
  401: "Chưa có quyền truy cập",
  403: "Truy cập bị từ chối (ví dụ ip bị chặn)",
  404: "Yêu cầu không tìm thấy",
  500: "Server đang bị lỗi",
};

const ErrorCollection = {
  SERVER: SERVER_ERROR,
};

export default ErrorCollection;
