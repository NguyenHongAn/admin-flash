import axiosClient from "../../api";
import URL from "../../api/URL";

const services = {
  getGeneralStatistics: (filter) => {
    return axiosClient.get(URL.GET_GENERAL_INFO, { params: { filter } });
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
  chartLabels: ["Mon", "Tues", "Wednes", "Thus", "Fri", "Sat", "Sun"],
  chartBorder: ["white"],
  chartColor: ["white"],
};

export default services;
