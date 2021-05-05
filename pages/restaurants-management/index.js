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
import { useSelector, useDispatch } from "react-redux";
import RestaurantInfoDialog from "../../components/RestaurantInfoDialog";
import CreateRestaurantDialog from "../../components/CreateRestaurantDialog";

function createRandomAvgScore(min, max) {
  return (Math.random() * (max - min) + min).toPrecision(3);
}

function genarateFakeNumber(start, length) {
  const seed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let temp = start;
  for (let i = 0; i < length - start.length; i++) {
    const index = Math.floor(Math.random() * seed.length);
    temp += seed[index];
  }
  return temp;
}

const TEMPLATE_DATA = [
  {
    id: "a",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "jipef40502@sejkt.com",
    name: "Quán Ăn Tisu - Nui & Mì Xào Bò - Shop Online",
    address: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
  },
  {
    id: "b",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Món Quảng Xuyên Việt",
    address: "39/10/11 Hoàng Bật Đạt, P. 15, Tân Bình, TP. HCM",
  },
  {
    id: "c",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Sunny House - Sinh Tố & Nước Ép",
    address: "499/24 Quang Trung, P. 10, Gò Vấp, TP. HCM",
  },
  {
    id: "d",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Bún Bò Đất Thánh - Shop Online",
    address: "221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM",
  },
  {
    id: "e",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Quán Bún Dì Vân",
    address: "66/32 Trần Văn Quang, P. 10, Tân Bình, TP. HCM",
  },
  {
    id: "f",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Rules Of Tea - Trà Sữa Đế Vương - Nguyễn Văn Cừ",
    address: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
  },
];

function RestaurantsManagement() {
  // const {email, contractID} = useSelector(state=>({
  //   email: state.restaurant.email,
  //   contractID: state.restaurant.contractID,
  // }));
  // const dispatch =useDispatch();
  const [email, setEmail] = useState("");
  const [contractID, setContractID] = useState("");
  const [totalRestuarant, setTotalRestaurant] = useState(121);
  const [adminRestaurants, setAdminRestaurants] = useState([]);
  const [seftRestaurant, setSeftRestaurants] = useState([]);
  const [districts, setDistricts] = useState([]);
  // const [pagingList, setPagingList] = useState([]);
  const [totalAdminRes, setTotalAdminRes] = useState(27);
  const [totalSeftRes, setTotalSeftRes] = useState(94);
  const [isOpenContract, setIsOpenContract] = useState(false);
  const [isOpenNewRestaurant, setIsOpenNewRestaurant] = useState(false);

  const handleCloseContractDialog = () => setIsOpenContract(false);
  const handleOpenContractDialog = (contract, resEmail) => {
    setContractID(contract);
    setEmail(resEmail);
    setIsOpenContract(true);
  };

  // const handleCloseNewResDialog = () => setIsOpenNewRestaurant(false);
  // const handleOpenNewResDialog = () => {
  //   // setContractID(contract);
  //   // setEmail(resEmail);
  //   setIsOpenNewRestaurant(true);
  //};
  return (
    <Layout>
      <Head>
        <title>Admin Flash - Restaurants</title>
        <link href="/Logo.png" rel="icon" />
      </Head>
      <RestaurantInfoDialog
        open={isOpenContract}
        email={email}
        contractID={contractID}
        handleClose={handleCloseContractDialog}
      ></RestaurantInfoDialog>
      <CreateRestaurantDialog
        open={isOpenNewRestaurant}
        handleClose={setIsOpenNewRestaurant}
      ></CreateRestaurantDialog>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>
            <div>
              {" "}
              <span>Quản lý nhà hàng</span>
              <span className={styles.total}>
                Tổng cộng: {totalRestuarant} nhà hàng
              </span>
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
                    <option value="-1" disabled>
                      Khu vực
                    </option>
                    {districts.map((district) => (
                      <option value={district.ID}>{district.Name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setIsOpenNewRestaurant(true)}
                  className="add-restaurant-btn"
                >
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
                      <TableCell align="center"> Đơn hàng</TableCell>
                      <TableCell align="center">Đánh giá</TableCell>

                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="restaurant-table__body">
                    {TEMPLATE_DATA.map((restaurant, i) => (
                      <TableRow key={restaurant.id}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{restaurant.name}</TableCell>
                        <TableCell align="center">
                          {restaurant.address}
                        </TableCell>
                        <TableCell align="center">
                          {restaurant.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          {restaurant.orders}
                        </TableCell>
                        <TableCell align="center">
                          {restaurant.avgReview}/{restaurant.reviews} đánh giá
                        </TableCell>
                        <TableCell align="center">
                          <div
                            className="contract-restaurant-link"
                            onClick={() => {
                              handleOpenContractDialog(
                                restaurant.contractID,
                                restaurant.email
                              );
                            }}
                          >
                            Liên hệ
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
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
                    <option value="-1" disabled>
                      Khu vực
                    </option>
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
                  <TableBody className="restaurant-table__body"></TableBody>
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
