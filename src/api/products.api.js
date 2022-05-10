import axios from "axios";
import { API } from "../utils/urls";
import { getStore, getToken } from "./token";

export const getProductByCode = (code) => {
  return axios.get(`${API}products/getCode?code=${code}`, {
    headers: {
      authorization: getToken(),
    },
  });
};

export const getProductsPaginated = (page,name) => {
  return axios.get(
    `${API}products?page=${page}&storeId=${getStore()}&take=10&name=${name}`,
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
};

export const addProduct =(data)=> {
  return axios.post(`${API}products`, data,{
     headers: {
      authorization: getToken(),
    },
  });
}