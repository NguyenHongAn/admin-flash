import React, { useState, useEffect } from "react";
import {
  TableContainer,
  TableHead,
  TableBody,
  Table,
  Button,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import add12Filled from "@iconify/icons-fluent/add-12-filled";
import settingTwotone from "@iconify/icons-ant-design/setting-twotone";
//components
import CreateRestaurantDialog from "../CreateRestaurantDialog";
import RatingStar from "../RatingStar";
import Pagination from "../Pagination";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import ErrorCollection from "../../config";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
//functions
import Service from "./services.js";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import ToastAction from "../../store/actions/toast.A";
import { getReceiptStatus } from "../../utils/getStatus";
import { removeJwt } from "../../utils/handleAuthetication";

const useStyles = makeStyles(styles);

function RestaurantTable({
  color,
  search,
  selectedCity,
  cities,
  partner,
  districts,
  reload,
  setReload,
}) {
  const [page, setPage] = useState(1);
  const [district, setDistrict] = useState("");
  const [isReload, setIsReload] = useState(null);
  const [isOpenNewRestaurant, setIsOpenNewRestaurant] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();

  const handlePageChange = (selected) => {
    setPage(selected);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleRecallPermission = async (id, name) => {
    try {
      const { errorCode } = await Service.handleRecallPermission(id);
      console.log(errorCode);
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo(
            "success",
            "Thu h???i quy???n qu???n l?? nh?? h??ng " + name
          )
        );
        setReload(Date.now());
      } else {
        dispatch(
          ToastAction.displayInfo("error", ErrorCollection.EXECUTION[errorCode])
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.reponse.status === 401) {
          router.push("/");
          removeJwt();
        }
        dispatch(
          ToastAction.displayInfo(
            "error",
            ErrorCollection.SERVER[error.response.status]
          )
        );
      }
    }
  };

  const handleCloseCreateResDialog = () => {
    setIsOpenNewRestaurant(false);
    setReload(Date.now());
  };
  const handleServiceFee = async (id) => {
    try {
      const { errorCode } = await Service.paymentForServiceFee(id);
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo("success", "???? thanh to??n ph?? d???ch v???")
        );
      } else {
        dispatch(
          ToastAction.displayInfo("error", ErrorCollection.EXECUTION[errorCode])
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        router.push("/");
        removeJwt();
      }
      error.response
        ? dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.SERVER[error.response.status]
            )
          )
        : null;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { errorCode, data, pagingInfo } =
          await Service.getRestaurantMangagementInfo({
            city: selectedCity,
            search,
            page,
            partner,
            district,
          });
        if (errorCode === 0) {
          setRestaurants(data.restaurants);

          setTotal(data.totalRestaurants);
          setPerPage(pagingInfo.perPage);
          setTotalPage(pagingInfo.totalPage);
          setPage(pagingInfo.currentPage);
        } else if (errorCode === ErrorCollection.INVALID_PARAM) {
          router.push("/");
        } else {
          dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.SERVER[error.response.status]
            )
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/");
          removeJwt();
        } else if (typeof error.response !== "undefined") {
          dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.SERVER[error.response.status]
            )
          );
        }
      }
    })();
  }, [search, selectedCity, district, page, reload]);

  return (
    <div>
      <CreateRestaurantDialog
        open={isOpenNewRestaurant}
        handleClose={handleCloseCreateResDialog}
        location={cities}
      ></CreateRestaurantDialog>
      <Card>
        <CardHeader color={color} className={classes.restaurantTableHead}>
          <div style={{ display: "flex" }}>
            <div className={classes.cardTitleWhite}>
              Nh?? h??ng {partner === true ? " t??? " : ` do Admin `} qu???n l?? :{" "}
              {total} nh?? h??ng
            </div>
            <select
              name="area"
              className="restaurant-table-filter"
              value={district ? district : -1}
              onChange={handleDistrictChange}
            >
              <option value="">Khu v???c</option>
              {districts &&
                districts.map((district) => (
                  <option value={district.Name} key={district.Id}>
                    {district.Name}
                  </option>
                ))}
            </select>
          </div>
          {partner ? null : (
            <button
              onClick={() => setIsOpenNewRestaurant(true)}
              className="add-restaurant-btn"
            >
              <Icon
                icon={add12Filled}
                style={{ color: "#2196f3", fontSize: "24px" }}
              />
              T???o nh?? h??ng m???i
            </button>
          )}
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead className="restaurant-table__head">
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>T??n nh?? h??ng</TableCell>
                  <TableCell>?????a ch???</TableCell>
                  <TableCell>Th???i gian t???o</TableCell>
                  <TableCell>T??nh tr???ng</TableCell>
                  <TableCell> Ph?? d???ch v???</TableCell>
                  <TableCell>????nh gi??</TableCell>

                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="restaurant-table__body">
                {restaurants &&
                  restaurants.map((restaurant, i) => (
                    <TableRow key={restaurant._id}>
                      <TableCell>{i + 1 + (page - 1) * perPage}</TableCell>
                      <TableCell className={classes.shortName}>
                        {restaurant.name}
                      </TableCell>
                      <TableCell className={classes.shortName}>
                        {restaurant.address}
                      </TableCell>
                      <TableCell>
                        {new Date(restaurant.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getReceiptStatus(restaurant.serviceCharge)}
                      </TableCell>
                      <TableCell>{restaurant.serviceFee}</TableCell>
                      <TableCell>
                        <RatingStar
                          value={parseInt(restaurant.rating)}
                        ></RatingStar>
                      </TableCell>
                      <TableCell>
                        {restaurant.serviceCharge === -1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            style={{
                              color: "#FFDF85",
                              borderColor: "#FFDF85",
                              margin: "0px 5px",
                            }}
                            onClick={() =>
                              handleServiceFee(restaurant.receiptID)
                            }
                          >
                            Tr??? ph??
                          </Button>
                        ) : null}
                        {restaurant.isService ? (
                          !restaurant.isPartner ? (
                            <div
                              className={classes.settingBtn}
                              onClick={() => {
                                router.push({
                                  pathname: `/restaurants/${restaurant._id}`,
                                });
                              }}
                            >
                              <Icon
                                icon={settingTwotone}
                                style={{ color: "black", fontSize: "24px" }}
                              />
                            </div>
                          ) : (
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() =>
                                handleRecallPermission(
                                  restaurant._id,
                                  restaurant.name
                                )
                              }
                            >
                              Thu h???i
                            </Button>
                          )
                        ) : (
                          <span style={{ textWrap: "break-word" }}>
                            ???? ng???ng kinh doanh
                          </span>
                        )}
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
            pageDisplay={3}
          ></Pagination>
        </CardBody>
      </Card>
    </div>
  );
}
export default RestaurantTable;
