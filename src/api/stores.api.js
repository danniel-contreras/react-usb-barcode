import axios from "axios";
import { API } from "../utils/urls";
import { getToken } from "./token";

export const getStores = (page, take = 100) => {
    return axios.get(`${API}stores?page=${page}&take=${take}`, {
      headers: {
        authorization: getToken(),
      },
    });
  }
