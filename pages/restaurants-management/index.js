import React, { useState, useRef } from "react";
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
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import add12Filled from "@iconify/icons-fluent/add-12-filled";
import searchIcon from "@iconify/icons-fe/search";
import { useSelector, useDispatch } from "react-redux";
import RestaurantInfoDialog from "../../components/RestaurantInfoDialog";
import CreateRestaurantDialog from "../../components/CreateRestaurantDialog";
import Service from "./services.js";
import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import Meta from "../../components/Meta";

export const getServerSideProps = async ({ query }) => {
  const { city, search, page } = query;

  const { errorCode, data, pagingInfo } =
    await Service.getRestaurantMangagementInfo(city, search, page);

  if (errorCode === 0) {
    return {
      props: {
        cities: data.cities,
        districts: data.districts,
        adminRestaurants: data.adminRestaurants,
        seftRestaurants: data.seftRestaurants,
        perPage: pagingInfo.perPage,
        totalPage: pagingInfo.totalPage,
        currentPage: pagingInfo.currentPage,
      },
    };
  }
  return {
    props: {
      cities: [],
      districts: [],
      seftRestaurants: [],
      adminRestaurants: [],
      perPage: 0,
      totalPage: 0,
      currentPage: 0,
    },
  };
};

function RestaurantsManagement({
  cities,
  districts,
  seftRestaurants,
  adminRestaurants,
  perPage,
  totalPage,
  currentPage,
}) {
  const [email, setEmail] = useState("");
  const [contractID, setContractID] = useState("");
  const totalRestaurants = adminRestaurants.length + seftRestaurants.length;

  const router = useRouter();
  const { city, search, page } = router.query;
  const [isOpenContract, setIsOpenContract] = useState(false);
  const [isOpenNewRestaurant, setIsOpenNewRestaurant] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [searchString, setSearchString] = useState(search);
  const handleCloseContractDialog = () => setIsOpenContract(false);
  const handleOpenContractDialog = (contract, resEmail) => {
    setContractID(contract);
    setEmail(resEmail);
    setIsOpenContract(true);
  };

  const handleCityChange = (e) => {
    router.push({
      pathname: "/restaurants-management",
      query: { city: e.target.value, search, page },
    });
  };

  const handleSearchTermChange = (e) => {
    setSearchString(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      router.push({
        pathname: "/restaurants-management",
        query: { search: e.target.value, city, page },
      });
    }, 700);
  };

  const handlePageChange = (data) => {
    const selected = parseInt(data.selected) + 1;

    router.push({
      pathname: "/restaurants-management",
      query: { page: selected, search, city },
    });
  };

  return (
    <Layout>
      <Meta title="Admin Flash - Restaurants"></Meta>
      <RestaurantInfoDialog
        open={isOpenContract}
        email={email}
        contractID={contractID}
        handleClose={handleCloseContractDialog}
      ></RestaurantInfoDialog>
      <CreateRestaurantDialog
        open={isOpenNewRestaurant}
        handleClose={setIsOpenNewRestaurant}
        location={cities}
      ></CreateRestaurantDialog>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>
            <div>
              {" "}
              <span>Quản lý nhà hàng</span>
              <span className={styles.total}>
                Tổng cộng: {totalRestaurants} nhà hàng
                <select
                  name="city"
                  className="city-filter"
                  defaultValue={city ? city : -1}
                  onChange={handleCityChange}
                >
                  <option value="-1" disabled>
                    Thành phố
                  </option>
                  {cities &&
                    cities.map((city) => (
                      <option value={city.Id} key={city._id}>
                        {city.Name}
                      </option>
                    ))}
                </select>
              </span>
            </div>
            <TextField
              onChange={handleSearchTermChange}
              name="search"
              id="search"
              value={searchString}
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
                  <div>
                    Nhà hàng do Admin quản lý: {adminRestaurants.length} nhà
                    hàng
                  </div>
                  <select
                    name="area"
                    className="restaurant-table-filter"
                    defaultValue={-1}
                  >
                    <option value="-1" disabled>
                      Khu vực
                    </option>
                    {districts &&
                      districts.map((district) => (
                        <option value={district.Id} key={district.Id}>
                          {district.Name}
                        </option>
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
                    {adminRestaurants &&
                      adminRestaurants.map((restaurant, i) => (
                        <TableRow key={restaurant._id}>
                          <TableCell align="center">
                            {i + 1 + (currentPage - 1) * perPage}
                          </TableCell>
                          <TableCell align="center">
                            {restaurant.name}
                          </TableCell>
                          <TableCell align="center">
                            {restaurant.address}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(
                              restaurant.createdAt
                            ).toLocaleDateString()}
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
              <Pagination
                currentPage={page}
                pageCount={totalPage}
                handler={handlePageChange}
              ></Pagination>
              {/* <div className="restaurant-table-show-more" onClick={() => {}}>
                <Icon
                  icon={reloadIcon}
                  style={{ color: "#0288d1", margin: "2px" }}
                />
                Xem thêm
              </div> */}
            </Paper>
            {/* <Paper style={{ marginTop: "10px" }}>
              <div
                className="restaurant-table-status"
                style={{ background: "#FF0000" }}
              >
                <div style={{ display: "flex" }}>
                  <div>
                    Nhà hàng tự đăng ký: {seftRestaurants.length} nhà hàng
                  </div>
                  <select
                    name="area"
                    className="restaurant-table-filter"
                    defaultValue={-1}
                  >
                    <option value="-1" disabled>
                      Khu vực
                    </option>
                    {districts &&
                      districts.map((district) => (
                        <option value={district.Id} key={district.Id}>
                          {district.Name}
                        </option>
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
              <Pagination currentPage={page} pageCount={totalPage}></Pagination> */}
            {/* <div className="restaurant-table-show-more" onClick={() => {}}>
                <Icon
                  icon={reloadIcon}
                  style={{ color: "#0288d1", margin: "2px" }}
                />
                Xem thêm
              </div>
            </Paper> */}
          </div>
        </div>
      }
    </Layout>
  );
}
export default RestaurantsManagement;
