import axios from "axios";
import queryString from "query-string";
import store from "../store";

const axiosClient = axios.create({
  //baseURL: process.env.SERVER_URL,
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  timeout: 10000,
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle request
axiosClient.interceptors.request.use((config) => {
  // ..Handle token
  const state = store.getState();
  const token = state.auth.jwt;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle response
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // ..Handle error

    throw error;
  }
);

export default axiosClient;
