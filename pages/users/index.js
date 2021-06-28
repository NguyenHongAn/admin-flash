import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import personLock16Regular from "@iconify/icons-fluent/person-lock-16-regular";
import BlockUserDialog from "../../components/BlockUserDialog";
import Service from "./services";
import Pagination from "../../components/Pagination";
import ErrorCollection from "../../config";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
// import Button from "../../components/CustomButtons/Button";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
//function
import clearObject from "../../utils/clearObject";
import routers from "../../config/routers";
import { useRouter } from "next/router";
import { getTokenInSS, removeJwt } from "../../utils/handleAuthetication";

export async function getServerSideProps({ req, query }) {
  const { page, phone, email } = query;
  const token = getTokenInSS(req);
  try {
    const { errorCode, data, pagingInfo } = await Service.getUserManagement(
      page,
      email,
      phone,
      token
    );

    if (errorCode === 0) {
      return {
        props: {
          totalUsers: data.totalUsers,
          users: data.users,
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

function UsersManagement({
  totalUsers,
  users,
  currentPage,
  totalPage,
  perPage,
  errorType,
  errorMsg,
}) {
  const [isOpenBlockDialog, setIsOpenBlockDialog] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { page, phone, email } = router.query;
  const [emailFilter, setEmailFilter] = useState(email);
  const [phoneFilter, setPhoneFilter] = useState(phone);
  const classes = useStyles();
  const color = "success";
  const typingTimeoutRef = useRef(null);

  const handleOpenBlockDialog = (account) => {
    setIsOpenBlockDialog(true);
    setUser(account);
  };

  const handleCloseBlockDialog = () => {
    setIsOpenBlockDialog(false);
    router.push({
      pathname: `/users`,
      query: clearObject({ page, email, phone }),
    });
  };

  const handlePageChange = (selected) => {
    router.push({
      pathname: `/users`,
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
        pathname: "/users",
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
        pathname: "/users",
        query: clearObject({ page, email, phone: e.target.value }),
      });
    }, 700);
  };

  return (
    <Layout routers={routers}>
      <Meta title="Admin Flash - Users"></Meta>
      <BlockUserDialog
        open={isOpenBlockDialog}
        handleClose={handleCloseBlockDialog}
        info={user}
        role="user"
      ></BlockUserDialog>
      {
        <div>
          <div className={classes.tableContainer}>
            <Card>
              <CardHeader color={color}>
                <h4 className={classes.cardTitleWhite}>
                  Tổng cộng: {totalUsers ? totalUsers : 0} người dùng
                </h4>
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
                          Sđt{" "}
                          <input
                            type="text"
                            value={phoneFilter}
                            onChange={handlePhoneFilterChange}
                          ></input>
                        </TableCell>
                        <TableCell>Họ và tên</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="user-table__body">
                      {users &&
                        users.map((user, i) => (
                          <TableRow key={user._id}>
                            <TableCell>
                              {i + 1 + (currentPage - 1) * perPage}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>

                            <TableCell>{user.fullname}</TableCell>
                            <TableCell>
                              {Service.getStatus(user.status)}
                            </TableCell>
                            <TableCell>
                              {user.status === -2 ? (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  onClick={() => {
                                    handleOpenBlockDialog(user);
                                  }}
                                >
                                  Mở khóa
                                </Button>
                              ) : user.status === 0 ? (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  onClick={() => {
                                    handleOpenBlockDialog(user);
                                  }}
                                >
                                  Khóa
                                </Button>
                              ) : null}
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
        </div>
      }
    </Layout>
  );
}
export default UsersManagement;
