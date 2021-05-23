import React from "react";
import Layout from "../../components/Layout";
import SatitisticsBox from "../../components/SatitisticsBox";
import styles from "../../styles/Home.module.css";
import { Icon } from "@iconify/react";
import storeIcon from "@iconify/icons-dashicons/store";
import multipleUsers from "@iconify/icons-gridicons/multiple-users";
import roundDirectionsBike from "@iconify/icons-ic/round-directions-bike";
import arrowGrowth from "@iconify/icons-uil/arrow-growth";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import Meta from "../../components/Meta";
import Service from "./services";
import ErrorCollection from "../../config";
import Toast from "../../components/Toast";

const DATASET = {
  labels: ["Mon", "Tues", "Wednes", "Thus", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "số đơn",
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  ],
};

export async function getServerSideProps() {
  try {
    const { errorCode, data } = await Service.getGeneralStatistics();

    if (errorCode === 0) {
      return {
        props: {
          totalRestaurants: data.totalRestaurants,
          totalUsers: data.totalUsers,
        },
      };
    } else {
      return {
        props: {
          errorType: "error",
          errorMsg: ErrorCollection.SERVER[errorCode],
        },
      };
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
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
  errorType,
  errorMsg,
}) {
  const route = useRouter();

  return (
    <Layout>
      <Meta title="Admin Flash - General Statistics"></Meta>
      {errorType ? <Toast type={errorType} content={errorMsg}></Toast> : null}
      {
        <div className={styles.container}>
          {/* <div className="container__title"> Thống kê chung</div> */}
          <Grid container>
            <Grid container className="container__grid">
              <Grid item md={3} key="/restaurants-management">
                <SatitisticsBox
                  icon={storeIcon}
                  handleClick={() => route.push("/restaurants-management")}
                  backgroundColor={"#ffff00"}
                  content={totalRestaurants + " nhà hàng, quán ăn"}
                />
              </Grid>
              <Grid item md={3} key={"/users-management"}>
                <SatitisticsBox
                  icon={multipleUsers}
                  handleClick={() => route.push("/users-management")}
                  backgroundColor={"#0288D1"}
                  content={totalUsers + " người dùng"}
                />
              </Grid>
              <Grid item md={3} key={"/drivers-management"}>
                <SatitisticsBox
                  icon={roundDirectionsBike}
                  handleClick={() => route.push("/drivers-management")}
                  backgroundColor={"#44C019"}
                  content={"94 tài xế"}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={6}>
                <div className="statistics-chart">
                  <div className="statistics-chart__general">
                    <div className="statistics-chart__general-info">
                      Số đơn đặt hàng trong tuần: 2367
                    </div>
                    <div className="statistics-chart__general-percent">
                      <Icon
                        icon={arrowGrowth}
                        style={{ fontSize: "40px" }}
                      ></Icon>
                      14%
                    </div>
                  </div>
                  <Bar data={DATASET}></Bar>
                </div>
              </Grid>
              <Grid item md={6} xs={6}>
                <div className="statistics-chart"></div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      }
    </Layout>
  );
}
export default GeneralStatistic;
