import axios from "axios";
import { config } from "dotenv";

config();

export const AUTH_SERVICE = axios.create({
  baseURL: process.env.AUTH_API,
  headers: {
    Authorization: "Bearer " + process.env.AUTH_ACCESS_TOKEN,
  },
});

export async function walletInfo(address) {
  return (
    await AUTH_SERVICE.request({
      method: "GET",
      url: "/auth/wallet-info",
      params: {
        address,
        service: process.env.SERVICE_KEY,
      },
    })
  ).data;
}

export async function publicPermissions() {
  return (
    await AUTH_SERVICE.request({
      method: "GET",
      url: "/auth/public-permissions",
    })
  ).data;
}
