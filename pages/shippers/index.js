import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Grid,
  Button,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import add12Filled from "@iconify/icons-fluent/add-12-filled";
import accountDetails from "@iconify/icons-mdi/account-details";
import BlockUserDialog from "../../components/BlockUserDialog";
import Service from "./services";
import Pagination from "../../components/Pagination";
import ErrorCollection from "../../config";
import RatingStar from "../../components/RatingStar";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CreateShipperDialog from "../../components/CreateShipperDialog";
import ShipperDetailDialog from "../../components/ShipperDetailDialog";
//style
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
//function
import { useRouter } from "next/router";
import clearObject from "../../utils/clearObject";
import routers from "../../config/routers";
import { getTokenInSS, removeJwt } from "../../utils/handleAuthetication";
import { getReceiptStatus } from "../../utils/getStatus";
import { useDispatch } from "react-redux";
import ToastAction from "../../store/actions/toast.A";

export async function getServerSideProps({ req, query }) {
  const { page, phone, email } = query;
  const token = getTokenInSS(req);
  try {
    const { errorCode, data, pagingInfo } = await Service.getShipperManagement(
      page,
      email,
      phone,
      token
    );
    //console.log(data.shippers);
    if (errorCode === 0) {
      return {
        props: {
          totalShipper: data.totalShipper,
          shippers: data.shippers,
          totalPage: pagingInfo.totalPage,
          currentPage: pagingInfo.currentPage,
          perPage: pagingInfo.perPage,
        },
      };
    } else if (errorCode === ErrorCollection.INVALID_PARAM) {
      return { notFound: true };
    } else {
      return {
        props: {
          errorType: "error",
          errorMsg: ErrorCollection.EXECUTION[errorCode],
        },
      };
    }
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.status === 401) {
      removeJwt();
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (typeof error.response !== "undefined") {
      return {
        props: {
          errorType: "error",
          errorMsg: ErrorCollection.SERVER[error.response.status],
        },
      };
    }
    return { notFound: true };
  }
}

const useStyles = makeStyles(styles);

function ShippersManagement({
  totalShipper,
  shippers,
  currentPage,
  totalPage,
  perPage,
  errorType,
  errorMsg,
}) {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { page, phone, email } = router.query;
  const [emailFilter, setEmailFilter] = useState(email);
  const [phoneFilter, setPhoneFilter] = useState(phone);
  const [isOpenBlockDialog, setIsOpenBlockDialog] = useState(false);
  const [isOpenCreateShipper, setIsOpenCreateShipper] = useState(false);
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);
  const typingTimeoutRef = useRef(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleOpenBlockDialog = (account) => {
    setIsOpenBlockDialog(true);
    setUser(account);
  };

  const handleCloseBlockDialog = () => {
    setIsOpenBlockDialog(false);
    router.push({
      pathname: "/shippers",
      query: clearObject({ page, email, phone }),
    });
  };
  const handleCloseShipperDialog = () => {
    setIsOpenCreateShipper(false);
    router.push({
      pathname: "/shippers",
      query: clearObject({ page, email, phone }),
    });
  };
  const handleOpenDetailDialog = (shipper) => {
    setIsOpenDetailDialog(true);
    setUser(shipper);
  };
  const handlePageChange = (selected) => {
    router.push({
      pathname: `/shippers`,
      query: clearObject({ page: selected, email, phone }),
    });
  };

  const handleEmailFilterChange = (e) => {
    setEmailFilter(e.target.value);
    //
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      router.push({
        pathname: "/shippers",
        query: clearObject({ page: page, email: e.target.value, phone }),
      });
    }, 700);
  };

  const handlePhoneFilterChange = (e) => {
    setPhoneFilter(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      router.push({
        pathname: "/shippers",
        query: clearObject({ page, email, phone: e.target.value }),
      });
    }, 700);
  };

  const handleServiceFee = async (id) => {
    try {
      const { errorCode } = await Service.paymentForServiceFee(id);
      console.log(errorCode);
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo("success", "???? thanh to??n ph?? d???ch v???")
        );
        router.push({
          pathname: "/shippers",
          query: clearObject({ page, email, phone }),
        });
      } else {
        dispatch(
          ToastAction.displayInfo("error", ErrorCollection.EXECUTION[errorCode])
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        router.push("/");
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

  return (
    <Layout routers={routers}>
      <Meta title="Flash Admin - Shipper"></Meta>
      <BlockUserDialog
        open={isOpenBlockDialog}
        handleClose={handleCloseBlockDialog}
        info={user}
        role="shipper"
      ></BlockUserDialog>
      <CreateShipperDialog
        handleClose={handleCloseShipperDialog}
        open={isOpenCreateShipper}
      ></CreateShipperDialog>
      <ShipperDetailDialog
        handleClose={setIsOpenDetailDialog}
        open={isOpenDetailDialog}
        shipper={user}
      ></ShipperDetailDialog>
      {
        <div>
          <div className={classes.tableContainer}>
            <Card>
              <CardHeader color="info" className={classes.restaurantTableHead}>
                <h4 className={classes.cardTitleWhite}>
                  T???ng c???ng: {totalShipper ? totalShipper : 0} t??i x???
                </h4>
                <button
                  onClick={() => setIsOpenCreateShipper(true)}
                  className="add-restaurant-btn"
                >
                  <Icon
                    icon={add12Filled}
                    style={{ color: "#2196f3", fontSize: "24px" }}
                  />
                  T???o t??i x??? m???i
                </button>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table>
                    <TableHead className="user-table__head">
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>
                          Email{" "}
                          <input
                            type="text"
                            value={emailFilter}
                            onChange={handleEmailFilterChange}
                          ></input>
                        </TableCell>
                        <TableCell>
                          S??t{" "}
                          <input
                            type="text"
                            value={phoneFilter}
                            onChange={handlePhoneFilterChange}
                          ></input>
                        </TableCell>

                        <TableCell>????nh gi??</TableCell>
                        <TableCell>Tr???ng th??i ph??</TableCell>
                        <TableCell>Ph?? d???ch v???</TableCell>
                        <TableCell>Tr???ng th??i</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="user-table__body">
                      {shippers &&
                        shippers.map((shipper, i) => (
                          <TableRow key={shipper._id}>
                            <TableCell>
                              {i + 1 + (currentPage - 1) * perPage}
                            </TableCell>
                            <TableCell>{shipper.email}</TableCell>
                            <TableCell>{shipper.phone}</TableCell>

                            <TableCell>
                              <RatingStar
                                value={parseInt(shipper.avgReview)}
                              ></RatingStar>
                            </TableCell>
                            <TableCell>
                              {getReceiptStatus(shipper.serviceCharge)}
                            </TableCell>
                            <TableCell>{shipper.serviceFee}</TableCell>
                            <TableCell>
                              {Service.getStatus(shipper.status)}
                            </TableCell>

                            <Grid
                              container
                              spacing={1}
                              justify="space-between"
                              component={TableCell}
                            >
                              {shipper.serviceCharge === -1 ? (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  style={{
                                    color: "#FFDF85",
                                    borderColor: "#FFDF85",
                                    margin: "0px 2px",
                                  }}
                                  onClick={() =>
                                    handleServiceFee(shipper.receiptID)
                                  }
                                >
                                  Tr??? ph??
                                </Button>
                              ) : null}
                              {shipper.status === -2 ? (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  onClick={() => {
                                    handleOpenBlockDialog(shipper);
                                  }}
                                >
                                  M??? kh??a
                                </Button>
                              ) : shipper.status === 0 ? (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  style={{ margin: "0px 2px" }}
                                  onClick={() => {
                                    handleOpenBlockDialog(shipper);
                                  }}
                                >
                                  Kh??a
                                </Button>
                              ) : null}
                              <Icon
                                icon={accountDetails}
                                style={{
                                  fontSize: "24px",
                                  float: "right",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleOpenDetailDialog(shipper)}
                              ></Icon>
                            </Grid>
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
            </Card>
          </div>
        </div>
      }
    </Layout>
  );
}
export default ShippersManagement;
