import axios from "axios";
const baseURL = "http://localhost:3004";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject({
      statusCode: error.response?.status,

      message: error.response?.data?.message,
    });
  }
);

export default axiosInstance;
