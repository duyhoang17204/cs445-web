import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const AUTH_TOKEN = Cookies.get("token_auth");
  if (AUTH_TOKEN) {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  }
  return config;
});

export const request = () => axiosInstance;

// Parse error chung
export const parseErrorResponse = (err: any) => {
  console.log("❌ API Error:", err);

  if (err?.response) {
    if (err.response.status === 401) {
    }
    return err.response.data;
  }

  return { error: "Bad request" };
};

export interface IRequestData {
  body?: any;
  params?: any;
  query?: any;
}
