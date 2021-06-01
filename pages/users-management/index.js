import React, { useState, useRef } from "react";
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
import { useRouter } from "next/router";
import clearObject from "../../utils/clearObject";
import ErrorCollection from "../../config";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
// import Button from "../../components/CustomButtons/Button";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";

function getStatus(num) {
  switch (num) {
    case -2:
      return (
        <Icon
          icon={personLock16Regular}
          style={{ color: "black", fontSize: "24px" }}
        ></Icon>
      );
    case -1:
      return "Chưa xác thực";
    case 0:
      return "Bình thường";

    default:
      break;
  }
}

export const getServerSideProps = async ({ query }) => {
  const { page, phone, email } = query;
  try {
    const { errorCode, data, pagingInfo } = await Service.getUserManagement(
      page,
      email,
      phone
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
    console.log(error);
    if (error.response.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        errorType: "error",
        errorMsg: ErrorCollection.SERVER[error.response.status],
      },
    };
  }
};

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
      pathname: `/users-management`,
      query: clearObject({ page, email, phone }),
    });
  };

  const handlePageChange = (selected) => {
    router.push({
      pathname: `/users-management`,
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
        pathname: "/users-management",
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
        pathname: "/users-management",
        query: clearObject({ page, email, phone: e.target.value }),
      });
    }, 700);
  };

  return (
    <Layout>
      <Meta title="Admin Flash - Users"></Meta>
      {errorType ? <Toast type={errorType} content={errorMsg}></Toast> : null}
      <BlockUserDialog
        open={isOpenBlockDialog}
        handleClose={handleCloseBlockDialog}
        info={user}
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
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">
                          Email{" "}
                          <input
                            type="text"
                            value={emailFilter}
                            onChange={handleEmailFilterChange}
                          ></input>
                        </TableCell>
                        <TableCell align="center">
                          Sđt{" "}
                          <input
                            type="text"
                            value={phoneFilter}
                            onChange={handlePhoneFilterChange}
                          ></input>
                        </TableCell>
                        <TableCell align="center">Lượt báo cáo</TableCell>
                        <TableCell align="center">Điểm</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="user-table__body">
                      {users &&
                        users.map((user, i) => (
                          <TableRow key={user._id}>
                            <TableCell align="center">
                              {i + 1 + (currentPage - 1) * perPage}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.phone}</TableCell>
                            <TableCell align="center">{user.reports}</TableCell>
                            <TableCell align="center">{user.point}</TableCell>
                            <TableCell align="center">
                              {getStatus(user.status)}
                            </TableCell>
                            <TableCell align="center">
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
