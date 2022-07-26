import axios from "axios";
const BASE_URL = "http://api.gensanfeedmill.com";
const BASE_URL_VERIFY = "http://api.gensanfeedmill.com/api/service/verify";

export const APP_URL =
  process.env.NODE_ENV !== "production"
    ? "localhost:3000"
    : "http://api.gensanfeedmill.com";

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
