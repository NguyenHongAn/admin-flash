import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import BlockUserDialog from "../../components/BlockUserDialog";

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
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "b",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "c",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },

  {
    id: "d",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "e",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "f",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "g",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "h",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
  {
    id: "i",
    email: "random@gmail.com",
    phone: genarateFakeNumber("+84", 10),
    point: Math.floor(Math.random() * 1000),
    reports: Math.floor(Math.random() * 111),
    status: Math.floor(Math.random() * 10) % 3,
  },
];

function UsersManagement() {
  const [totalUser, setTotalUser] = useState(1065);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageList, setPageList] = useState([1, 2, 3]);
  const [usersPresent, setUsersPresent] = useState(10);
  const [isOpenBlockDialog, setIsOpenBlockDialog] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpenBlockDialog = (isOpen, account) => {
    setIsOpenBlockDialog(isOpen);
    setEmail(account);
  };
  const handleCloseBlockDialog = () => {
    setIsOpenBlockDialog(false);
  };

  return (
    <Layout>
      <Head>
        <title> Admin Flash - Users</title>
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
              <span>Quản lý người dùng</span>
              <span className={styles.total}>
                Tổng cộng: {totalUser} người dùng
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
                      <TableCell align="center">Điểm</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="user-table__body">
                    {TEMPLATE_DATA.map((user, i) => (
                      <TableRow key={user.id}>
                        <TableCell align="center">
                          {i + 1 + currentPage * usersPresent}
                        </TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.phone}</TableCell>
                        <TableCell align="center">{user.reports}</TableCell>
                        <TableCell align="center">{user.point}</TableCell>
                        <TableCell align="center">
                          {getStatus(user.status)}
                        </TableCell>
                        <TableCell align="center">
                          <div
                            className="block-user"
                            onClick={() => {
                              handleOpenBlockDialog(true, user.email);
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
                  padding: 10,
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
export default UsersManagement;
