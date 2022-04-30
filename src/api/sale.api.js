import axios from "axios";
import { API } from "../utils/urls";
import { getToken } from "./token";

export const addSale = (sales) => {
  return axios.post(`${API}sales`, sales, {
    headers: {
      authorization: getToken(),
    },
  });
};

export const getSales = (page = 1, take = 10) => {
  return axios.get(`${API}sales?page=${page}&limit=${take}`, {
    headers: {
      authorization: getToken(),
    },
  });
};
