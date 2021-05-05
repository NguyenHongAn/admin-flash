import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
} from "@material-ui/core";
import BlockUserDialog from "../../components/BlockUserDialog";

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

function DriversManagement() {
  const [totalDrvers, setTotlDrivers] = useState(94);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageList, setPageList] = useState([1, 2, 3]);
  const [driversPresent, setDriversPresent] = useState(10);
  const [isOpenBlockDialog, setIsOpenBlockDialog] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpenBlockDialog = (account) => {
    setIsOpenBlockDialog(true);
    setEmail(account);
  };

  const handleCloseBlockDialog = () => {
    setIsOpenBlockDialog(false);
  };
  return (
    <Layout>
      <Head>
        <title>Flash Admin - Drivers</title>
        <link href="/Logo.png" rel="icon" />
      </Head>
      <BlockUserDialog
        open={isOpenBlockDialog}
        handleClose={handleCloseBlockDialog}
        info={email}
      ></BlockUserDialog>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>
            <div>
              Quản lý tài xế
              <span className={styles.total}>
                Tổng cộng: {totalDrvers} tài xế
              </span>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead
                    className="user-table__head"
                    style={{ background: "#2196F3" }}
                  >
                    <TableRow>
                      <TableCell align="center">STT</TableCell>
                      <TableCell align="center">
                        Email <input type="text"></input>
                      </TableCell>
                      <TableCell align="center">
                        Sđt <input type="text"></input>
                      </TableCell>
                      <TableCell align="center">Lượt báo cáo</TableCell>
                      <TableCell align="center">Đánh giá</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="user-table__body">
                    {TEMPLATE_DATA.map((driver, i) => (
                      <TableRow key={driver.id}>
                        <TableCell align="center">
                          {i + 1 + currentPage * driversPresent}
                        </TableCell>
                        <TableCell align="center">{driver.email}</TableCell>
                        <TableCell align="center">{driver.phone}</TableCell>
                        <TableCell align="center">{driver.reports}</TableCell>
                        <TableCell align="center">
                          {" "}
                          {driver.avgReview}/{driver.reviews} đánh giá
                        </TableCell>
                        <TableCell align="center">
                          {getStatus(driver.status)}
                        </TableCell>
                        <TableCell align="center">
                          <div
                            className="block-user"
                            onClick={() => {
                              handleOpenBlockDialog(true, driver.email);
                            }}
                          >
                            Khóa{" "}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div
                style={{
                  padding: 8,
                  textAlign: "center",
                }}
              >
                {pageList.map((page) => {
                  return (
                    <IconButton
                      key={page}
                      className={`paging-item ${
                        parseInt(currentPage) + 1 === parseInt(page) &&
                        "paging-item__active"
                      }`}
                    >
                      {page}
                    </IconButton>
                  );
                })}
              </div>
            </Paper>
          </div>
        </div>
      }
    </Layout>
  );
}
export default DriversManagement;
