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
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Table from "../../components/Table/Table";
import muiStyles from "../../assets/jss/views/dashboardStyle";
import { ArrowDownward } from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";
import routers from "../../config/routers";
import { getTokenInSS, removeJwt } from "../../utils/handleAuthetication";
import clearObject from "../../utils/clearObject";
import SettingDialog from "../../components/SettingDialog";

export async function getServerSideProps({ req, query }) {
  const { filter } = query;

  const token = getTokenInSS(req);
  try {
    const { errorCode, data } = await Service.getGeneralStatistics(
      filter,
      token
    );

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
          statusOrderArr: data.orderStatus,
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
    console.log(error.message);
    if (error.response && error.response.status === 401) {
      removeJwt();
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (error.response) {
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
  statusOrderArr,
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
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const handleFilterChange = (e) => {
    route.push({
      pathname: "/general-statistics",
      query: { filter: e.target.value },
    });
  };

  const handleCloseSettingDalog = () => {
    setIsOpenSetting(false);
    route.push({
      pathname: "/general-statistics",
      query: clearObject({ filter }),
    });
  };
  return (
    <Layout routers={routers}>
      <Meta title="Admin Flash - General Statistics"></Meta>
      <SettingDialog
        open={isOpenSetting}
        handleClose={handleCloseSettingDalog}
        shipper={shipperData}
        restaurant={restaurantData}
      ></SettingDialog>
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
                  onClick={() => route.push("/restaurants")}
                  className={classes.cardFrame}
                >
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon icon={storeIcon}></Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Nh?? h??ng, qu??n ??n</p>
                    <h3 className={classes.cardTitle}>
                      {totalRestaurants} nh??
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <InfoIcon />
                      To??n h??? th???ng
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
                  onClick={() => route.push("/users")}
                  className={classes.cardFrame}
                >
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Icon icon={multipleUsers}></Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Ng?????i d??ng</p>
                    <h3 className={classes.cardTitle}>
                      {totalUsers} t??i kho???n
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <InfoIcon></InfoIcon>
                      Kh??ng t??nh t??i x???
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
                  onClick={() => route.push("/shippers")}
                  className={classes.cardFrame}
                >
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Icon icon={roundDirectionsBike}></Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>T??i x???</p>
                    <h3 className={classes.cardTitle}>{totalShippers}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <InfoIcon />
                      V???a c???p nh???t
                    </div>
                  </CardFooter>
                </Card>
              </Grid>
            </Grid>
            <hr className={classes.breakLine}></hr>
            <Grid item container md={12}>
              <span className={classes.cardContainer}>
                Th???ng k?? theo:{" "}
                <select
                  name="filter"
                  className="filter"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="week">Tu???n</option>
                  <option value="month">Th??ng</option>
                  <option value="year">N??m</option>
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
                            borderColor: Service.CHART_COLOR.whiteColor,
                            backgroundColor: Service.CHART_COLOR.whiteColor,
                            label: "S??? ????n",
                            data: numberOrderArr,
                          },
                        ],
                      }}
                      options={Service.chartOptions}
                    ></Line>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>
                      T???ng s??? ????n: {totalOrders ? totalOrders : 0} ????n
                    </h4>
                    {numberPercent > 0 ? (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowUpward
                            className={classes.upArrowCardCategory}
                          />
                          {numberPercent}
                        </span>
                        {" % t??ng so v???i tr?????c"}
                      </p>
                    ) : (
                      <p className={classes.cardCategory}>
                        <span className={classes.warningText}>
                          <ArrowDownward
                            className={classes.upArrowCardCategory}
                          />
                          {numberPercent}
                        </span>
                        {" % gi???m so v???i tr?????c"}
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
                            borderColor: Service.CHART_COLOR.whiteColor,
                            backgroundColor: Service.CHART_COLOR.whiteColor,
                            label: "Thanh to??n",
                            data: paymentOrderArr,
                          },
                        ],
                      }}
                      options={Service.chartOptions}
                    ></Line>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>
                      T???ng thanh to??n :{" "}
                      {totalPayment ? Number(totalPayment).toLocaleString() : 0}{" "}
                      ?????ng
                    </h4>
                    {paymentPercent > 0 ? (
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowUpward
                            className={classes.upArrowCardCategory}
                          />
                          {paymentPercent}
                        </span>
                        {" % t??ng so v???i tr?????c"}
                      </p>
                    ) : (
                      <p className={classes.cardCategory}>
                        <span className={classes.warningText}>
                          <ArrowDownward
                            className={classes.upArrowCardCategory}
                          />
                          {paymentPercent}
                        </span>
                        {" % gi???m so v???i tr?????c"}
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Grid>
              <Grid item className={classes.cardContainer} md={6} xs={6}>
                <Card chart>
                  <CardHeader color="success">
                    <Line
                      data={{
                        labels: chartLabels,
                        datasets: [
                          {
                            borderColor: Service.CHART_COLOR.infoColor[1],
                            backgroundColor: Service.CHART_COLOR.infoColor[1],
                            label: "????n h??ng th??nh c??ng",
                            data: statusOrderArr[0],
                          },
                          {
                            borderColor: Service.CHART_COLOR.warningColor[1],
                            backgroundColor:
                              Service.CHART_COLOR.warningColor[1],
                            label: "????n h??ng b??? ho??n",
                            data: statusOrderArr[1],
                          },
                          {
                            borderColor: Service.CHART_COLOR.whiteColor,
                            backgroundColor: Service.CHART_COLOR.whiteColor,
                            label: "????n h??ng boom",
                            data: statusOrderArr[2],
                          },
                        ],
                      }}
                      options={Service.chartOptions}
                    ></Line>
                  </CardHeader>
                  <CardBody>
                    <Grid container>
                      <h4
                        className={classes.cardTitle}
                        style={{ marginRight: "10px" }}
                      >
                        S??? ????n th??nh c??ng:{" "}
                        {statusOrderArr[0].reduce(
                          (pre, curr) => (pre += curr),
                          0
                        )}
                        <span>{"  "}</span>
                      </h4>
                      <h4
                        className={classes.cardTitle}
                        style={{ marginRight: "10px" }}
                      >
                        S??? ????n b??? h???y:{" "}
                        {statusOrderArr[1].reduce(
                          (pre, curr) => (pre += curr),
                          0
                        )}
                      </h4>
                      <h4
                        className={classes.cardTitle}
                        style={{ marginRight: "10px" }}
                      >
                        S??? ????n b??? boom:{" "}
                        {statusOrderArr[2].reduce(
                          (pre, curr) => (pre += curr),
                          0
                        )}
                      </h4>
                    </Grid>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>
            <hr className={classes.breakLine}></hr>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader
                    color="warning"
                    style={{ justifyContent: "space-between", display: "flex" }}
                    onClick={() => setIsOpenSetting(true)}
                  >
                    <h4
                      className={classes.cardTitleWhite}
                      style={{ with: "50%" }}
                    >
                      Th???ng k?? ph?? d???ch v???
                    </h4>
                    <SettingsIcon style={{ cursor: "pointer" }}></SettingsIcon>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHead={[
                        "T??n",
                        "Ph?? d???ch v??? (%)",
                        "th???i gian n??? (ng??y)",
                        "L?? thuy???t",
                        "C??n thi???u",
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
