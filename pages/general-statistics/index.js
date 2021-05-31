import React from "react";
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

import muiStyles from "../../assets/jss/views/dashboardStyle";
import { ArrowDownward } from "@material-ui/icons";

const useStyles = makeStyles(muiStyles);

export async function getServerSideProps() {
  try {
    const { errorCode, data } = await Service.getGeneralStatistics();

    if (errorCode === 0) {
      return {
        props: {
          totalRestaurants: data.totalRestaurants,
          totalUsers: data.totalUsers,
          totalShippers: data.totalShippers,
          totalOrders: data.totalOrders,
          totalPayment: data.totalPayment,
          numberOrderArr: data.numberOfOrderInWeek,
          paymentOrderArr: data.payOfOrderInWeek,
          numberPercent: data.numberPercent,
          paymentPercent: data.paymentPercent,
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

function GeneralStatistic({
  totalRestaurants,
  totalUsers,
  totalOrders,
  totalShippers,
  totalPayment,
  numberOrderArr,
  paymentOrderArr,
  numberPercent,
  paymentPercent,
  errorType,
  errorMsg,
}) {
  const classes = useStyles();
  const route = useRouter();
  return (
    <Layout>
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
            <Grid container>
              <Grid item className={classes.cardContainer} md={6} xs={6}>
                <Card chart>
                  <CardHeader color="info">
                    <Line
                      data={{
                        labels: Service.chartLabels,
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
                      Tổng số đơn trong tuần {totalOrders ? totalOrders : 0}
                    </h4>
                    {numberPercent > 0 ? (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowUpward
                            className={classes.upArrowCardCategory}
                          />
                          {numberPercent}
                        </span>
                        {"% tăng so với tuần trước"}
                      </p>
                    ) : (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowDownward
                            className={classes.upArrowCardCategory}
                          />
                          {numberPercent}
                        </span>
                        {"% giảm so với tuần trước"}
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
                        labels: Service.chartLabels,
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
                      Tổng thanh toán trong tuần:{" "}
                      {totalPayment ? totalPayment : 0}
                    </h4>
                    {paymentPercent > 0 ? (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowUpward
                            className={classes.upArrowCardCategory}
                          />
                          {paymentPercent}
                        </span>
                        {"% tăng so với tuần trước"}
                      </p>
                    ) : (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowDownward
                            className={classes.upArrowCardCategory}
                          />
                          {paymentPercent}
                        </span>
                        {"% giảm so với tuần trước"}
                      </p>
                    )}
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
