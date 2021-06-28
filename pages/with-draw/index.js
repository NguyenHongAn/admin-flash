import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Grid,
} from "@material-ui/core";

import Service from "./services";
import Pagination from "../../components/Pagination";
import ErrorCollection from "../../config";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
//style
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
//function
import { useRouter } from "next/router";
import clearObject from "../../utils/clearObject";
import routers from "../../config/routers";
import { getTokenInSS, removeJwt } from "../../utils/handleAuthetication";
import { useDispatch } from "react-redux";
import ToastAction from "../../store/actions/toast.A";

export async function getServerSideProps({ req, query }) {
  const { page, phone } = query;
  const token = getTokenInSS(req);
  try {
    const { errorCode, data, pagingInfo } = await Service.getWithDrawList(
      page,
      phone,
      token
    );

    if (errorCode === 0) {
      return {
        props: {
          listWithDraw: data.listWithdraw || [],
          totalPage: pagingInfo.totalPage,
          currentPage: pagingInfo.currentPage,
          perPage: pagingInfo.perPage,
        },
      };
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

//tên, role, số điện thoại, số tiền yêu cầu rút, số tiền hiện tại trong ví
function WithDraw({ listWithDraw, currentPage, totalPage, perPage }) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { page, phone } = router.query;
  const [phoneFilter, setPhoneFilter] = useState(phone);
  const typingTimeoutRef = useRef(null);
  const handlePageChange = (selected) => {
    router.push({
      pathname: `/with-draw`,
      query: clearObject({ page: selected, filter }),
    });
  };

  const handleFilterChange = (e) => {
    setPhoneFilter(e.target.value);
    //
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      router.push({
        pathname: `/with-draw`,
        query: clearObject({ page, phone: e.target.value }),
      });
    }, 700);
  };

  const solveWithDraw = async (id) => {
    try {
      const { errorCode, data } = await Service.solveWithDraw(id);
      console.log(errorCode);
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo(
            "success",
            "Yêu cầu hoàn tiền đã được giải quyết"
          )
        );
        router.push({
          pathname: `/with-draw`,
          query: clearObject({ page, phone }),
        });
      } else {
        dispatch(ToastAction.displayInfo("error", data));
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        removeJwt();
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

  const cancelWithDraw = async (id) => {
    try {
      const { errorCode } = await Service.cancelWithDraw(id);
      console.log({ errorCode });
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo("success", "Tạm hoãn yêu cầu hoàn tiền")
        );
        router.push({
          pathname: `/with-draw`,
          query: clearObject({ page, phone }),
        });
      } else {
        dispatch(
          ToastAction.displayInfo("error", ErrorCollection.EXECUTION[errorCode])
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        removeJwt();
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
      <Meta title="Flash Admin - With Draw"></Meta>
      <div className={classes.tableContainer}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>
              Tổng cộng: {listWithDraw && listWithDraw.length} yêu cầu
            </h4>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table>
                <TableHead className="user-table__head">
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên </TableCell>
                    <TableCell>
                      Sđt{" "}
                      <input
                        type="text"
                        value={phoneFilter}
                        onChange={handleFilterChange}
                      ></input>{" "}
                    </TableCell>
                    <TableCell>Ví điện tử</TableCell>
                    <TableCell>Đối tượng</TableCell>
                    <TableCell>Số tiền rút</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="user-table__body">
                  {listWithDraw &&
                    listWithDraw.map((request, i) => (
                      <TableRow key={request._id}>
                        <TableCell>
                          {i + 1 + (currentPage - 1) * perPage}
                        </TableCell>
                        <TableCell>{request.User.Name}</TableCell>
                        <TableCell>{request.User.Phone}</TableCell>
                        <TableCell>{request.User.Wallet}</TableCell>
                        <TableCell>
                          {request.User.Role === 2 ? "Nhà hàng" : "Tài xế"}
                        </TableCell>
                        <TableCell>{request.Amount}</TableCell>
                        <TableCell>
                          {Service.getStatus(request.Status)}
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={1}>
                            {request.Status === 0 ? null : (
                              <div>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  style={{
                                    color: "#FFDF85",
                                    borderColor: "#FFDF85",
                                    margin: "0 5px",
                                  }}
                                  onClick={() => cancelWithDraw(request._id)}
                                >
                                  Hủy
                                </Button>

                                <Button
                                  variant="outlined"
                                  style={{
                                    color: "#008000",
                                    borderColor: "#008000",
                                    margin: "0 5px",
                                  }}
                                  size="small"
                                  onClick={() => solveWithDraw(request._id)}
                                >
                                  Thanh toán
                                </Button>
                              </div>
                            )}
                          </Grid>
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
        </Card>
      </div>
    </Layout>
  );
}
export default WithDraw;
