import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import ReportDetailDialog from "../../components/ReportDetailDialog";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Pagination from "../../components/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
import routers from "../../config/routers";

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

const useStyles = makeStyles(styles);

function ListReport() {
  const [unSolveReports, setUnSolveResports] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [reportsPresent, setReportsPresent] = useState(10);
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);
  const [report, setReport] = useState({});
  const classes = useStyles();

  const handleOpenDetailDialog = (info) => {
    setReport(info);
    setIsOpenDetailDialog(true);
  };

  return (
    <Layout routers={routers}>
      <Meta title="Flash Admin - Reports"></Meta>

      <ReportDetailDialog
        open={isOpenDetailDialog}
        handleClose={setIsOpenDetailDialog}
        report={report}
      ></ReportDetailDialog>
      {
        <div>
          <div className={classes.tableContainer}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  {" "}
                  Tổng cộng: {unSolveReports} chưa giải quyết
                </h4>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table>
                    <TableHead className="report-table__head">
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell>Nội dung</TableCell>
                        <TableCell>Thời gian</TableCell>
                        <TableCell>Người báo cáo</TableCell>
                        <TableCell>Đối tượng báo cáo</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="report-table__body">
                      {TEMPLATE_DATA.map((report, i) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            {i + 1 + currentPage * reportsPresent}
                          </TableCell>
                          <TableCell>
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
                          <TableCell>{report.content}</TableCell>
                          <TableCell>
                            {report.createdAt.toLocaleDateString()}
                          </TableCell>
                          <TableCell>{report.annunciator}</TableCell>
                          <TableCell>{report.reported}</TableCell>
                          <TableCell>
                            {report.status ? (
                              <input
                                type="checkbox"
                                onChange={() => {}}
                                checked
                              ></input>
                            ) : (
                              <input
                                type="checkbox"
                                onChange={() => {}}
                              ></input>
                            )}
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
export default ListReport;
