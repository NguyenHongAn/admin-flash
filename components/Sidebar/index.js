import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { Icon } from "@iconify/react";
import lineChartOutlined from "@iconify/icons-ant-design/line-chart-outlined";
import storeIcon from "@iconify/icons-dashicons/store";
import multipleUsers from "@iconify/icons-gridicons/multiple-users";
import roundDirectionsBike from "@iconify/icons-ic/round-directions-bike";
import licenseIcon from "@iconify/icons-carbon/license";
import roundReport from "@iconify/icons-ic/round-report";
import authAction from "../../store/actions/auth.A";

function Sidebar() {
  //const user = useSelector((state) => state.auth);
  const route = useRouter();
  const dispatch = useDispatch();
  console.log(route.pathname);
  return (
    <>
      <Head>
        <title>Flash Admin - General Statistics</title>
      </Head>
      <div>
        <div className="sidebar__name"> Admin Dashboard</div>
        <ul className="sidebar__list">
          <li
            className={`sidebar__list-item ${
              route.pathname === "/general-statistics"
                ? "sidebar__list-item-active"
                : ""
            }`}
            onClick={() => route.push("/general-statistics")}
          >
            <Icon
              icon={lineChartOutlined}
              style={{ fontSize: "24px", marginRight: 15 }}
            />
            <span>Thống kê chung</span>
          </li>
          <li
            className={`sidebar__list-item ${
              route.pathname === "/restaurants-management"
                ? "sidebar__list-item-active"
                : ""
            }`}
            onClick={() => {
              route.push("/restaurants-management");
            }}
          >
            <Icon
              icon={storeIcon}
              style={{ fontSize: "24px", marginRight: 15 }}
            />

            <span>Quản lý nhà hàng</span>
          </li>

          <li
            className={`sidebar__list-item ${
              route.pathname === "/users-management"
                ? "sidebar__list-item-active"
                : ""
            }`}
            onClick={() => route.push("/users-management")}
          >
            <Icon
              icon={multipleUsers}
              style={{ fontSize: "24px", marginRight: 15 }}
            />
            <span>Quản lý người dùng</span>
          </li>
          <li
            className={`sidebar__list-item ${
              route.pathname === "/drivers-management"
                ? "sidebar__list-item-active"
                : ""
            }`}
            onClick={() => {
              route.push("/drivers-management");
            }}
          >
            <Icon
              icon={roundDirectionsBike}
              style={{ fontSize: "24px", marginRight: 15 }}
            />
            <span>Quản lý tài xế</span>
          </li>
          <li
            className={`sidebar__list-item warning ${
              route.pathname === "/list-report"
                ? "sidebar__list-item-active"
                : ""
            }`}
            onClick={() => {
              route.push("/list-report");
            }}
          >
            <Icon
              icon={roundReport}
              style={{ fontSize: "24px", marginRight: 15 }}
            />
            <span>Khiếu nại/ Góp ý</span>
          </li>
          <li
            className={`sidebar__list-item ${
              route.pathname === "/restaurants-lincese"
                ? "sidebar__list-item-active"
                : ""
            }`}
            onClick={() => {
              route.push("/restaurants-lincese");
            }}
          >
            <Icon
              icon={licenseIcon}
              style={{ fontSize: "24px", marginRight: 15 }}
            />
            <span>Cấp quyền nhà hàng</span>
          </li>
        </ul>
      </div>

      <div
        className="sidebar__sign-out"
        onClick={() => {
          dispatch(authAction.signOut());
          localStorage.removeItem("jwt");
          route.push("/");
        }}
      >
        Đăng xuất
      </div>
    </>
  );
}
export default Sidebar;
