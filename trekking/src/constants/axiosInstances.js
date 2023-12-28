import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosInstanceFiles = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    contentType: `multipart/form-data`,
  },
});
