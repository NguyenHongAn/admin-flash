import lineChartOutlined from "@iconify/icons-ant-design/line-chart-outlined";
import storeIcon from "@iconify/icons-dashicons/store";
import multipleUsers from "@iconify/icons-gridicons/multiple-users";
import roundDirectionsBike from "@iconify/icons-ic/round-directions-bike";
import roundReport from "@iconify/icons-ic/round-report";
import coinF from "@iconify/icons-jam/coin-f";

const routes = [
  {
    path: "/general-statistics",
    name: "Thống kê chung",
    icon: lineChartOutlined,
  },
  {
    path: "/restaurants",
    name: "Quản lý nhà hàng",
    icon: storeIcon,
  },
  {
    path: "/users",
    name: "Quản lý người dùng",
    icon: multipleUsers,
  },
  {
    path: "/shippers",
    name: "Quản lý tài xế ",
    icon: roundDirectionsBike,
  },
  {
    path: "/list-report",
    name: "Khiếu nại/ Tố cáo",
    icon: roundReport,
  },
  {
    path: "/with-draw",
    name: "Thanh toán",
    icon: coinF,
  },
];

export default routes;
