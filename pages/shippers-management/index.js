import React, { useState } from "react";
import Layout from "../../components/Layout";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
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
  const [pageList, setPageList] = useState([1, 2, 3]);
  const [pageCount, setPageCount] = useState(10);
  const [driversPresent, setDriversPresent] = useState(10);
  const [isOpenBlockDialog, setIsOpenBlockDialog] = useState(false);
  const [email, setEmail] = useState("");

  const classes = useStyles();
  const handleOpenBlockDialog = (account) => {
    setIsOpenBlockDialog(true);
    setEmail(account);
  };

  const handleCloseBlockDialog = () => {
    setIsOpenBlockDialog(false);
  };
  return (
    <Layout>
      <Meta title="Flash Admin - Shipper"></Meta>

      <BlockUserDialog
        open={isOpenBlockDialog}
        handleClose={handleCloseBlockDialog}
        info={email}
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
                            <RatingStar value={driver.avgReview}></RatingStar>
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
                              Khóa
                            </div>
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
