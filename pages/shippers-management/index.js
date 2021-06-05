import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from "@material-ui/core";
import BlockUserDialog from "../../components/BlockUserDialog";
import RatingStar from "../../components/RatingStar";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Pagination from "../../components/Pagination";
//style
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
import { useRouter } from "next/router";
import clearObject from "../../utils/clearObject";
import routers from "../../config/routers";

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

function getStatus(num) {
  switch (num) {
    case 0:
      return "Khóa";
    case 1:
      return "Bình thường";

    default:
      break;
  }
}

const TEMPLATE_DATA = [
  {
    id: "a",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "b",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "c",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },

  {
    id: "d",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    reviews: Math.floor(Math.random() * 100),
    avgReview: createRandomAvgScore(3, 5),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "e",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "f",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "g",
    email: "random@gmail.com",
    avgReview: createRandomAvgScore(3, 5),
    phone: genarateFakeNumber("+84", 10),
    reviews: Math.floor(Math.random() * 100),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "h",
    email: "random@gmail.com",
    avgReview: createRandomAvgScore(3, 5),
    phone: genarateFakeNumber("+84", 10),
    reviews: Math.floor(Math.random() * 100),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "i",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    reviews: Math.floor(Math.random() * 100),
    avgReview: createRandomAvgScore(3, 5),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
];

const useStyles = makeStyles(styles);

function DriversManagement() {
  const [totalDrvers, setTotlDrivers] = useState(94);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { page, phone, email } = router.query;
  const [emailFilter, setEmailFilter] = useState(email);
  const [phoneFilter, setPhoneFilter] = useState(phone);
  const [driversPresent, setDriversPresent] = useState(10);
  const [isOpenBlockDialog, setIsOpenBlockDialog] = useState(false);
  const [user, setUser] = useState({});
  const typingTimeoutRef = useRef(null);

  const classes = useStyles();

  const handleOpenBlockDialog = (account) => {
    setIsOpenBlockDialog(true);
    setUser(account);
  };

  const handleCloseBlockDialog = () => {
    setIsOpenBlockDialog(false);
    router.push({
      pathname: "/shippers-management",
      query: clearObject({ page, email, phone }),
    });
  };

  const handlePageChange = (selected) => {
    router.push({
      pathname: `/shippers-management`,
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
        pathname: "/shippers-management",
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
        pathname: "/shippers-management",
        query: clearObject({ page, email, phone: e.target.value }),
      });
    }, 700);
  };

  return (
    <Layout routers={routers}>
      <Meta title="Flash Admin - Shipper"></Meta>

      <BlockUserDialog
        open={isOpenBlockDialog}
        handleClose={handleCloseBlockDialog}
        info={user}
      ></BlockUserDialog>
      {
        <div>
          <div className={classes.tableContainer}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  Tổng cộng: {totalDrvers} tài xế
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
                            onChange={handleEmailFilterChange}
                          ></input>
                        </TableCell>
                        <TableCell>
                          Sđt{" "}
                          <input
                            type="text"
                            onChange={handlePhoneFilterChange}
                          ></input>
                        </TableCell>

                        <TableCell>Đánh giá</TableCell>
                        <TableCell>Phí dịch vụ</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="user-table__body">
                      {TEMPLATE_DATA.map((driver, i) => (
                        <TableRow key={driver.id}>
                          <TableCell>
                            {i + 1 + currentPage * driversPresent}
                          </TableCell>
                          <TableCell>{driver.email}</TableCell>
                          <TableCell>{driver.phone}</TableCell>

                          <TableCell>
                            <RatingStar
                              value={parseInt(driver.avgReview)}
                            ></RatingStar>
                          </TableCell>
                          <TableCell>{driver.reports}</TableCell>
                          <TableCell>{getStatus(driver.status)}</TableCell>
                          <TableCell>
                            {driver.status === -2 ? (
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => {
                                  handleOpenBlockDialog(driver);
                                }}
                              >
                                Mở khóa
                              </Button>
                            ) : driver.status === 0 ? (
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => {
                                  handleOpenBlockDialog(driver);
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
                  currentPage={1}
                  pageCount={1}
                  pageDisplay={3}
                  handler={handlePageChange}
                ></Pagination>
              </CardBody>
            </Card>
          </div>
        </div>
      }
    </Layout>
  );
}
export default DriversManagement;
