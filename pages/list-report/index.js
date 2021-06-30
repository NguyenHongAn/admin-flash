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
//function
import routers from "../../config/routers";
import Service from "./services";
import { getTokenInSS, removeJwt } from "../../utils/handleAuthetication";
import ErrorCollection from "../../config";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, query }) {
  const { page } = query;
  const token = getTokenInSS(req);
  try {
    const { errorCode, data, pagingInfo } = await Service.getListReport(
      page,
      token
    );
    if (errorCode === 0) {
      return {
        props: {
          complaints: data.complaints,
          totalComplaints: data.totalComplaints,
          currentPage: pagingInfo.currentPage,
          perPage: pagingInfo.perPage,
          totalPage: pagingInfo.totalPage,
        },
      };
    } else if (errorCode === ErrorCollection.INVALID_PARAM) {
      return { notFound: true };
    }
    return {
      props: {
        errorType: "error",
        errorMSh: ErrorCollection.EXECUTION[errorCode],
      },
    };
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

function ListReport({
  complaints,
  totalComplaints,
  perPage,
  totalPage,
  currentPage,
}) {
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);
  const [reportId, setReport] = useState(null);
  const classes = useStyles();
  const router = useRouter();
  const { page } = router.query;

  const handleOpenDetailDialog = (id) => {
    setReport(id);
    setIsOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setIsOpenDetailDialog(false);
    router.push({
      pathname: "/list-report",
      query: { page },
    });
  };

  const handlePageChange = () => {
    router.push({
      pathname: `/list-report`,
      query: { page },
    });
  };

  return (
    <Layout routers={routers}>
      <Meta title="Flash Admin - Reports"></Meta>
      <ReportDetailDialog
        open={isOpenDetailDialog}
        handleClose={handleCloseDetailDialog}
        id={reportId}
      ></ReportDetailDialog>
      {
        <div>
          <div className={classes.tableContainer}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  {" "}
                  Tổng cộng:{" "}
                  {totalComplaints === 0
                    ? `${totalComplaints} chưa giải quyết`
                    : "Không có khiếu nại"}
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
                        <TableCell>Chi phí</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="report-table__body">
                      {complaints &&
                        complaints.map((report, i) => (
                          <TableRow key={report._id}>
                            <TableCell>
                              {i + 1 + (currentPage - 1) * perPage}
                            </TableCell>
                            <TableCell>
                              <div
                                className="report-table-image"
                                onClick={() => {
                                  handleOpenDetailDialog(report._id);
                                }}
                              >
                                <img
                                  src={report.images && report.images[0]}
                                  alt="image"
                                ></img>
                                <span className="info-overlay">
                                  + {report.images.length}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{report.reason}</TableCell>
                            <TableCell>
                              {new Date(report.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{report.fullname}</TableCell>
                            <TableCell>{report.payment}</TableCell>
                            <TableCell>
                              {report.status === 1 ? (
                                <input type="checkbox" checked readOnly></input>
                              ) : (
                                <input type="checkbox" readOnly></input>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  currentPage={currentPage}
                  pageCount={totalPage}
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
export default ListReport;
