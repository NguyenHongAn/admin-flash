import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  IconButton,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import add12Filled from "@iconify/icons-fluent/add-12-filled";
import searchIcon from "@iconify/icons-fe/search";
import settingTwotone from "@iconify/icons-ant-design/setting-twotone";
//components
import CreateRestaurantDialog from "../../components/CreateRestaurantDialog";
import RatingStar from "../../components/RatingStar";
import Pagination from "../../components/Pagination";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import ErrorCollection from "../../config";
import clearObject from "../../utils/clearObject";
import Toast from "../../components/Toast";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
//functions
import Service from "./services.js";
import { useRouter } from "next/router";
import routers from "../../config/routers";
import classNames from "classnames";
import RestaurantTable from "../../components/RestaurantTable";

export const getServerSideProps = async ({ query }) => {
  const { city } = query;

  try {
    const { errorCode, data } = await Service.getCities(city);
    if (errorCode === 0) {
      return {
        props: {
          cities: data.cities,
          districts: data.districts,
        },
      };
    } else if (errorCode === ErrorCollection.INVALID_PARAM) {
      return { notFound: true };
    }
    return {
      props: {
        errorMsg: ErrorCollection.EXECUTION[errorCode],
      },
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (typeof error.response !== "undefined") {
      return {
        props: {
          errorMsg: ErrorCollection.SERVER[error.response.status],
        },
      };
    }
    return { notFound: true };
  }
};

const useStyle = makeStyles(styles);

function RestaurantsManagement({ cities, districts, errorMsg }) {
  const classes = useStyle();
  const router = useRouter();
  const { city: selectedCity } = router.query;

  const [isOpenNewRestaurant, setIsOpenNewRestaurant] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [searchString, setSearchString] = useState("");

  const handleCityChange = (e) => {
    router.push({
      pathname: `/restaurants-management`,
      query: clearObject({ city: e.target.value }),
    });
  };

  const handleSearchTermChange = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setSearchString(e.target.value);
    }, 700);
  };

  return (
    <Layout routers={routers}>
      <Meta title="Admin Flash - Restaurants"></Meta>
      {errorMsg ? <Toast type="error" content={errorMsg}></Toast> : null}

      <CreateRestaurantDialog
        open={isOpenNewRestaurant}
        handleClose={setIsOpenNewRestaurant}
        location={cities}
      ></CreateRestaurantDialog>
      {
        <div>
          <div className={classes.containerTitle}>
            <div>
              <span className={classes.total}>
                <select
                  name="city"
                  className="city-filter"
                  value={selectedCity ? selectedCity : -1}
                  onChange={handleCityChange}
                >
                  <option value="-1" disabled>
                    Thành phố
                  </option>
                  {cities &&
                    cities.map((city) => (
                      <option value={city.Name} key={city._id}>
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
          <div>
            <RestaurantTable
              color="info"
              partner={false}
              search={searchString}
              selectedCity={selectedCity}
              cities={cities}
              districts={districts}
            ></RestaurantTable>
            <RestaurantTable
              partner={true}
              color="rose"
              search={searchString}
              selectedCity={selectedCity}
              cities={cities}
              districts={districts}
            ></RestaurantTable>
            {/* <Card>
              <CardHeader color="info" className={classes.restaurantTableHead}>
                <div style={{ display: "flex" }}>
                  <div className={classes.cardTitleWhite}>
                    Nhà hàng do Admin quản lý
                     : {adminRestaurants.length} nhà
                    hàng 
                  </div>
                  <select
                    name="area"
                    className="restaurant-table-filter"
                    value={district ? district : -1}
                    onChange={handleDistrictChange}
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
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead className="restaurant-table__head">
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Tên nhà hàng</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Thời gian tạo</TableCell>
                        <TableCell> Phí dịch vụ</TableCell>
                        <TableCell>Đánh giá</TableCell>

                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="restaurant-table__body">
                      {adminRestaurants &&
                        adminRestaurants.map((restaurant, i) => (
                          <TableRow key={restaurant._id}>
                            <TableCell>
                              {i + 1 + (currentPage - 1) * perPage}
                            </TableCell>
                            <TableCell className={classes.shortName}>
                              {restaurant.name}
                            </TableCell>
                            <TableCell>{restaurant.address}</TableCell>
                            <TableCell>
                              {new Date(
                                restaurant.createdAt
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{restaurant.serviceCharge}</TableCell>
                            <TableCell>
                              <RatingStar
                                value={parseInt(restaurant.avgReview)}
                              ></RatingStar>
                            </TableCell>
                            <TableCell>
                              <div
                                className={classes.settingBtn}
                                onClick={() => {
                                  router.push(
                                    `/restaurants-management/${restaurant._id}`
                                  );
                                }}
                              >
                                <Icon
                                  icon={settingTwotone}
                                  style={{ color: "black", fontSize: "24px" }}
                                />
                              </div>
                             
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  currentPage={currentPage}
                  pageCount={totalPage}
                  handler={handlePageChange}
                  pageDisplay={3}
                ></Pagination>
              </CardBody>
            </Card> */}
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
