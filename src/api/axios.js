import axios from "axios";
const BASE_URL = "http://172.16.0.118";
const BASE_URL_VERIFY = "http://172.16.0.118/api/service/verify";

export const APP_URL =
  process.env.NODE_ENV !== "production"
    ? "localhost:3000"
    : "http://172.16.0.115";

export default axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: BASE_URL,
});

export const axiosVerifyDoc = axios.create({
  baseURL: BASE_URL_VERIFY,
  method: "get",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
