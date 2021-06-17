const SERVER_ERROR = {
  400: "Yêu cầu gửi tới Server không chứa các tham số hợp lệ",
  401: "Chưa có quyền truy cập",
  403: "Truy cập bị từ chối (ví dụ ip bị chặn)",
  404: "Yêu cầu không tìm thấy",
  500: "Server đang bị lỗi",
};

const EXECUTION_ERROR = {
  1: "Không thể thực hiện",
  20: "Có lỗi khi gọi API hỗ trợ từ bên ngoài",
  100: "Server gặp lỗi khi tạo nhà hàng",
  101: "Lấy danh sách nhà hàn không thành công",
  102: "Ngừng khing doanh nhà hàng thất bại",
  103: "Lấy thông tin một nhà hàng thất bại",
  104: "Cập nhật nhà hàng thất bại",
  105: "Nhà hàng đã tồn tại tại địa chỉ",
  106: "Cấp quyền nhà hàng không thành công",
  110: "Lấy danh sách người dùng không thành công",
  111: "Có lỗi xãy ra khi khóa tài khoản người dùng này",
  112: "Người dùng hiện không tồn tại trong hệ thống, xin mời kiên tra lại",
  120: "Lấy danh sách tài xế thất bại",
  121: "Cập nhật thông tin đơn hàng hất bại",
  122: "không tìm thấy đơn hàng",
  130: "Thanh toán phí dịch vụ không thành công",
  140: "Hoàn tiền thất bại",
  141: "Lấy danh sách yêu cầu hoàn tiền không thành công",
  150: "Server đang lỗi tạm thời không thể đăng nhập",
  151: "Email không hợp lệ",
  152: "Mật khẩu không hợp lệ",
  160: "Tạo tài xế mới thất bại",
  170: "Lấy danh sách các khiếu nại thất bại",
  171: "Cập nhật khiếu nại thất bại",
  180: "Lấy danh sách thành phố và quận thất bại",
  181: "Lấy thông tin cài đặt thất bại",
  182: "Cập nhật thông tin cài đặt thât bại",
  190: "Lấy thông tin thống kê không thành công",
};

const ErrorCollection = {
  SERVER: SERVER_ERROR,
  EXECUTION: EXECUTION_ERROR,
  INVALID_PARAM: 99,
  SUCCESS: {
    0: "Thành công",
  },
};

export default ErrorCollection;
