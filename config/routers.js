import lineChartOutlined from "@iconify/icons-ant-design/line-chart-outlined";
import storeIcon from "@iconify/icons-dashicons/store";
import multipleUsers from "@iconify/icons-gridicons/multiple-users";
import roundDirectionsBike from "@iconify/icons-ic/round-directions-bike";
import licenseIcon from "@iconify/icons-carbon/license";
import roundReport from "@iconify/icons-ic/round-report";

const routes = [
  {
    path: "/general-statistics",
    name: "Thống kê chung",
    icon: lineChartOutlined,
  },
  {
    path: "/restaurants-management",
    name: "Quản lý nhà hàng",
    icon: storeIcon,
  },
  {
    path: "/users-management",
    name: "Quản lý người dùng",
    icon: multipleUsers,
  },
  {
    path: "/shippers-management",
    name: "Quản lý tài xế ",
    icon: roundDirectionsBike,
  },
  {
    path: "/list-report",
    name: " Khiếu nại/ Tố cáo",
    icon: roundReport,
  },
  {
    path: "/restaurants-license",
    name: "Cấp quyền nhà hàng",
    icon: licenseIcon,
  },
];

export default routes;
