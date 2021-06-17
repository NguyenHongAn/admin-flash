import axiosClient from "../../api";
import URL from "../../api/URL";
import {
  roseColor,
  infoColor,
  successColor,
  whiteColor,
  blackColor,
  primaryColor,
  warningColor,
} from "../../assets/jss";

const services = {
  getGeneralStatistics: (filter, token) => {
    return axiosClient.get(URL.GET_GENERAL_INFO, {
      params: { filter },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  chartOptions: {
    color: "white",
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          tickColor: "white",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          tickColor: "white",
        },
        ticks: {
          color: "white",
        },
      },
    },
  },
  CHART_COLOR: {
    roseColor,
    infoColor,
    successColor,
    whiteColor,
    blackColor,
    warningColor,
    primaryColor,
  },
};

export default services;
