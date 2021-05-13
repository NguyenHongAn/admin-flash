import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import {
  TableBody,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import ReportDetailDialog from "../../components/ReportDetailDialog";

function genarateFakeNumber(start, length) {
  const seed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let temp = start;
  for (let i = 0; i < length - start.length; i++) {
    const index = Math.floor(Math.random() * seed.length);
    temp += seed[index];
  }
  return temp;
}

const TEMPLATE_DATA = [
  {
    id: "a",
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    content: "random@gmail.com",
    annunciator: genarateFakeNumber("+84", 10),
    createdAt: new Date(),
    reported: "Mekong Gourment",
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },
  {
    id: "b",
    content: "random@gmail.com",
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    annunciator: genarateFakeNumber("+84", 10),
    createdAt: new Date(),
    reported: "Mekong Gourment",
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },
  {
    id: "c",
    content: "random@gmail.com",
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    annunciator: genarateFakeNumber("+84", 10),
    createdAt: new Date(),
    reported: "Mekong Gourment",
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },

  {
    id: "d",
    content: "random@gmail.com",
    annunciator: genarateFakeNumber("+84", 10),
    createdAt: new Date(),
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    reported: "Trà sữa Toco",
    orderID: "#28SSA442",
    status: Math.floor(Math.random() * 10) % 2,
  },
  {
    id: "e",
    content: "random@gmail.com",
    annunciator: genarateFakeNumber("+84", 10),
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    createdAt: new Date(),
    reported: "Thực Phẩm Quốc Tế Maison - Mai Văn Vĩnh",
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },
  {
    id: "f",
    content: "random@gmail.com",
    annunciator: genarateFakeNumber("+84", 10),
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    createdAt: new Date(),
    reported: "Thực Phẩm Quốc Tế Maison - Mai Văn Vĩnh",
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },
  {
    id: "g",
    content:
      "random@gmail.com https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
    annunciator: genarateFakeNumber("+84", 10),
    createdAt: new Date(),
    reported: "FoodcoMart - Hai Bà Trưng",
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },
  {
    id: "h",
    content: "random@gmail.com",
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    annunciator: genarateFakeNumber("+84", 10),
    createdAt: new Date(),
    reported: "FoodcoMart - Hai Bà Trưng",
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },
  {
    id: "i",
    content: "random@gmail.com",
    imageLinks: [
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    ],
    annunciator: genarateFakeNumber("+84", 10),
    createdAt: new Date(),
    reported: "FoodcoMart - Hai Bà Trưng",
    status: Math.floor(Math.random() * 10) % 2,
    orderID: "#28SSA442",
  },
];

function ListReport() {
  const [unSolveReports, setUnSolveResports] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageList, setPageList] = useState([1, 2, 3]);
  const [reportsPresent, setReportsPresent] = useState(10);
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);
  const [report, setReport] = useState({});

  const handleOpenDetailDialog = (info) => {
    setReport(info);
    setIsOpenDetailDialog(true);
  };

  return (
    <Layout>
      <Head>
        <title>Flash Admin - Reports</title>
        <link href="/Logo.png" rel="icon" />
      </Head>
      <ReportDetailDialog
        open={isOpenDetailDialog}
        handleClose={setIsOpenDetailDialog}
        report={report}
      ></ReportDetailDialog>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>
            <div>
              <span> Danh sách khiếu nại</span>
              <span className={styles.total}>
                Hiện có {unSolveReports} khiếu nại chưa giải quyết
              </span>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead
                    className="report-table__head"
                    style={{ background: "#FFCE31" }}
                  >
                    <TableRow>
                      <TableCell align="center">STT</TableCell>
                      <TableCell align="center">Hình ảnh</TableCell>
                      <TableCell align="center">Nội dung</TableCell>
                      <TableCell align="center">Thời gian</TableCell>
                      <TableCell align="center">Người báo cáo</TableCell>
                      <TableCell align="center">Đối tượng báo cáo</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="report-table__body">
                    {TEMPLATE_DATA.map((report, i) => (
                      <TableRow key={report.id}>
                        <TableCell align="center">
                          {i + 1 + currentPage * reportsPresent}
                        </TableCell>
                        <TableCell align="center">
                          <div
                            className="report-table-image"
                            onClick={() => {
                              handleOpenDetailDialog(report);
                            }}
                          >
                            <img
                              src={report.imageLinks && report.imageLinks[0]}
                              alt="image"
                            ></img>
                            <span className="info-overlay">
                              + {report.imageLinks.length}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="center">{report.content}</TableCell>
                        <TableCell align="center">
                          {report.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          {report.annunciator}
                        </TableCell>
                        <TableCell align="center">{report.reported}</TableCell>
                        <TableCell align="center">
                          {report.status ? (
                            <input
                              type="checkbox"
                              onChange={() => {}}
                              checked
                            ></input>
                          ) : (
                            <input type="checkbox" onChange={() => {}}></input>
                          )}
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
export default ListReport;
