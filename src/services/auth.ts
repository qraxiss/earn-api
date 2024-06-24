import axios from "axios";
import { config } from "dotenv";

config();

export const AUTH_SERVICE = axios.create({
  baseURL: process.env.AUTH_API,
  headers: {
    Authorization: "Bearer " + process.env.AUTH_ACCESS_TOKEN,
  },
});

export async function info(id) {
  return (
    await AUTH_SERVICE.request({
      method: "GET",
      url: "/user/info",
      params: {
        id,
        service: process.env.SERVICE_KEY,
      },
    })
  ).data;
}

export async function publicPermissions() {
  return (
    await AUTH_SERVICE.request({
      method: "GET",
      url: "/action/public-actions",
      params: {
        service: process.env.SERVICE_KEY,
      },
    })
  ).data;
}
