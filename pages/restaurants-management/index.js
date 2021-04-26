import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import {
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  IconButton,
  InputBase,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import add12Filled from "@iconify/icons-fluent/add-12-filled";
import reloadIcon from "@iconify/icons-oi/reload";
import Head from "next/head";
import searchIcon from "@iconify/icons-fe/search";

function RestaurantsManagement() {
  const [totalRestuarant, setTotalRestaurant] = useState(121);
  const [adminRestaurants, setAdminRestaurants] = useState([]);
  const [seftRestaurant, setSeftRestaurants] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [pagingList, setPagingList] = useState([]);
  const [totalAdminRes, setTotalAdminRes] = useState(27);
  const [totalSeftRes, setTotalSeftRes] = useState(94);

  return (
    <Layout>
      <Head>
        <title> Flash Admin - Restaurants</title>
      </Head>
      {
        <div className={styles.container}>
          <div className="container__title">
            <div>
              {" "}
              <span>Quản lý nhà hàng</span>
              <span className={styles.total}>Tổng cộng: {totalRestuarant}</span>
            </div>
            <TextField
              // variant="outlined"
              // className={styles.searchBox}
              style={{ width: "30%" }}
              placeholder="Tìm kiếm nhà hàng"
              InputProps={{
                "aria-label": "Tìm kiếm nhà hàng",
                endAdornment: (
                  <InputAdornment>
                    <IconButton type="submit" aria-label="search">
                      <Icon icon={searchIcon}></Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>
          <div className="restaurant-container">
            <Paper>
              <div
                className="restaurant-table-status"
                style={{ background: "#FFDF85" }}
              >
                <div style={{ display: "flex" }}>
                  <div>Nhà hàng do Admin quản lý: {totalAdminRes} nhà hàng</div>
                  <select
                    name="area"
                    className="restaurant-table-filter"
                    defaultValue={-1}
                  >
                    <option value="-1">Khu vực</option>
                    {districts.map((district) => (
                      <option value={district.ID}>{district.Name}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => {}} className="add-restaurant-btn">
                  <Icon
                    icon={add12Filled}
                    style={{ color: "#2196f3", fontSize: "24px" }}
                  />
                  Tạo nhà hàng mới
                </button>
              </div>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead className="restaurant-table__head">
                    <TableRow>
                      <TableCell align="center">STT</TableCell>
                      <TableCell align="center">Tên nhà hàng</TableCell>
                      <TableCell align="center">Địa chỉ</TableCell>
                      <TableCell align="center">Thời gian tạo</TableCell>
                      <TableCell align="center">Số lượng đơn hàng</TableCell>
                      <TableCell align="center">Đánh giá</TableCell>

                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>

              <div className="restaurant-table-show-more" onClick={() => {}}>
                <Icon
                  icon={reloadIcon}
                  style={{ color: "#0288d1", margin: "2px" }}
                />
                Xem thêm
              </div>
            </Paper>
            <Paper style={{ marginTop: "10px" }}>
              <div
                className="restaurant-table-status"
                style={{ background: "#FF0000" }}
              >
                <div style={{ display: "flex" }}>
                  <div>Nhà hàng tự đăng ký: {totalSeftRes} nhà hàng</div>
                  <select
                    name="area"
                    className="restaurant-table-filter"
                    defaultValue={-1}
                  >
                    <option value="-1">Khu vực</option>
                    {districts.map((district) => (
                      <option value={district.ID}>{district.Name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <TableContainer className="seft-restaurant-table">
                <Table aria-label="simple table">
                  <TableHead className="restaurant-table__head">
                    <TableRow>
                      <TableCell align="center">STT</TableCell>
                      <TableCell align="center">Tên nhà hàng</TableCell>
                      <TableCell align="center">Địa chỉ</TableCell>
                      <TableCell align="center">Thời gian tạo</TableCell>
                      <TableCell align="center">Số lượng đơn hàng</TableCell>
                      <TableCell align="center">Đánh giá</TableCell>

                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>

              <div className="restaurant-table-show-more" onClick={() => {}}>
                <Icon
                  icon={reloadIcon}
                  style={{ color: "#0288d1", margin: "2px" }}
                />
                Xem thêm
              </div>
            </Paper>
          </div>
        </div>
      }
    </Layout>
  );
}
export default RestaurantsManagement;
