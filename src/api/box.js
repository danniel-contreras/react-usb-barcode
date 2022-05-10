import axios from "axios";
import { API } from "../utils/urls";
import { getToken } from "./token";

export const saveBox = (box) => {
  localStorage.setItem("box", box);
};

export const getBox = () => {
  return localStorage.getItem("box");
};

export const deleteBox = () => {
  localStorage.removeItem("box");
};

export const addBox = (data) => {
  return axios.post(`${API}box`, data, {
    headers: {
      authorization: getToken(),
    },
  });
};
