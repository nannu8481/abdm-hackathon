import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const instanceB = axios.create({
  baseURL: process.env.REACT_APP_API_URL_B,
});

const instanceC = axios.create({
  baseURL: process.env.REACT_APP_API_URL_C,
});

export { instance, instanceB, instanceC };
