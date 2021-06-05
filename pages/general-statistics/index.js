import React, { useState } from "react";
import Layout from "../../components/Layout";
import InfoIcon from "@material-ui/icons/Info";
import { Icon } from "@iconify/react";
import storeIcon from "@iconify/icons-dashicons/store";
import multipleUsers from "@iconify/icons-gridicons/multiple-users";
import roundDirectionsBike from "@iconify/icons-ic/round-directions-bike";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
//core compoments
import Meta from "../../components/Meta";
import Service from "./services";
import ErrorCollection from "../../config";
import Toast from "../../components/Toast";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Table from "../../components/Table/Table";
import muiStyles from "../../assets/jss/views/dashboardStyle";
import { ArrowDownward } from "@material-ui/icons";
import routers from "../../config/routers";

export async function getServerSideProps({ query }) {
  const { filter } = query;
  try {
    const { errorCode, data } = await Service.getGeneralStatistics(filter);

    if (errorCode === 0) {
      return {
        props: {
          totalRestaurants: data.totalRestaurants,
          totalUsers: data.totalUsers,
          totalShippers: data.totalShippers,
          totalOrders: data.totalOrders,
          totalPayment: data.totalPayment,
          numberOrderArr: data.numberOfOrder,
          paymentOrderArr: data.payOfOrder,
          numberPercent: data.numberPercent,
          paymentPercent: data.paymentPercent,
          chartLabels: data.labels,
          shipperData: data.shipperData,
          restaurantData: data.restaurantData,
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
    console.log(error);
    if (error.response && error.response.status === 401) {
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
}

const useStyles = makeStyles(muiStyles);

function GeneralStatistic({
  totalRestaurants,
  totalUsers,
  totalOrders,
  totalShippers,
  chartLabels,
  totalPayment,
  numberOrderArr,
  paymentOrderArr,
  numberPercent,
  paymentPercent,
  errorType,
  errorMsg,
  shipperData,
  restaurantData,
}) {
  const classes = useStyles();
  const route = useRouter();
  const { filter } = route.query;
  //const [filter, setFilter] = useState(_filter);
  const handleFilterChange = (e) => {
    route.push({
      pathname: "/general-statistics",
      query: { filter: e.target.value },
    });
  };
  return (
    <Layout routers={routers}>
      <Meta title="Admin Flash - General Statistics"></Meta>
      {errorType ? <Toast type={errorType} content={errorMsg}></Toast> : null}
      {
        <div>
          <Grid container>
            <Grid container>
              <Grid
                item
                className={classes.cardContainer}
                xs={12}
                sm={6}
                md={3}
              >
                <Card
                  onClick={() => route.push("/restaurants-management")}
                  className={classes.cardFrame}
                >
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon icon={storeIcon}></Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Nhà hàng, quán ăn</p>
                    <h3 className={classes.cardTitle}>
                      {totalRestaurants} nhà
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <InfoIcon />
                      Toàn hệ thống
                    </div>
                  </CardFooter>
                </Card>
              </Grid>

              <Grid
                item
                className={classes.cardContainer}
                xs={12}
                sm={6}
                md={3}
              >
                <Card
                  onClick={() => route.push("/users-management")}
                  className={classes.cardFrame}
                >
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Icon icon={multipleUsers}></Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Người dùng</p>
                    <h3 className={classes.cardTitle}>
                      {totalUsers} tài khoản
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <InfoIcon></InfoIcon>
                      Không tính tài xế
                    </div>
                  </CardFooter>
                </Card>
              </Grid>
              <Grid
                item
                className={classes.cardContainer}
                xs={12}
                sm={6}
                md={3}
              >
                <Card
                  onClick={() => route.push("/drivers-management")}
                  className={classes.cardFrame}
                >
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Icon icon={roundDirectionsBike}></Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Tài xế</p>
                    <h3 className={classes.cardTitle}>{totalShippers}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <InfoIcon />
                      Vừa cập nhật
                    </div>
                  </CardFooter>
                </Card>
              </Grid>
            </Grid>
            <hr className={classes.breakLine}></hr>
            <Grid item container md={12}>
              <span className={classes.cardContainer}>
                Thống kê theo:{" "}
                <select
                  name="filter"
                  className="filter"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="week">Tuần</option>
                  <option value="month">Tháng</option>
                  <option value="year">Năm</option>
                </select>
              </span>
            </Grid>
            <Grid container>
              <Grid item className={classes.cardContainer} md={6} xs={6}>
                <Card chart>
                  <CardHeader color="info">
                    <Line
                      data={{
                        labels: chartLabels,
                        datasets: [
                          {
                            borderColor: Service.chartBorder,
                            backgroundColor: Service.chartColor,
                            label: "Số đơn",
                            data: numberOrderArr,
                          },
                        ],
                      }}
                      options={Service.chartOptions}
                    ></Line>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>
                      Tổng số đơn: {totalOrders ? totalOrders : 0} đơn
                    </h4>
                    {numberPercent > 0 ? (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowUpward
                            className={classes.upArrowCardCategory}
                          />
                          {numberPercent}
                        </span>
                        {" % tăng so với trước"}
                      </p>
                    ) : (
                      <p className={classes.cardCategory}>
                        <span className={classes.warningText}>
                          <ArrowDownward
                            className={classes.upArrowCardCategory}
                          />
                          {numberPercent}
                        </span>
                        {" % giảm so với trước"}
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Grid>
              <Grid item className={classes.cardContainer} md={6} xs={6}>
                <Card chart>
                  <CardHeader color="rose">
                    <Line
                      data={{
                        labels: chartLabels,
                        datasets: [
                          {
                            borderColor: Service.chartBorder,
                            backgroundColor: Service.chartColor,
                            label: "Thanh toán",
                            data: paymentOrderArr,
                          },
                        ],
                      }}
                      options={Service.chartOptions}
                    ></Line>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>
                      Tổng thanh toán : {totalPayment ? totalPayment : 0} đồng
                    </h4>
                    {paymentPercent > 0 ? (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowUpward
                            className={classes.upArrowCardCategory}
                          />
                          {paymentPercent}
                        </span>
                        {" % tăng so với trước"}
                      </p>
                    ) : (
                      <p className={classes.cardCategory}>
                        <span className={classes.warningText}>
                          <ArrowDownward
                            className={classes.upArrowCardCategory}
                          />
                          {paymentPercent}
                        </span>
                        {" % giảm so với trước"}
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Grid>
            </Grid>
            <hr className={classes.breakLine}></hr>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>
                      Thống kê phí dịch vụ
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      thống kê tổng cho nhà hàng
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHead={[
                        "Tên",
                        "Phí dịch vụ (%)",
                        "Lý thuyết",
                        "Còn thiếu",
                      ]}
                      tableData={[shipperData, restaurantData]}
                    ></Table>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </div>
      }
    </Layout>
  );
}
export default GeneralStatistic;
