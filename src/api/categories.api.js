import axios from "axios";
import { API } from "../utils/urls";
import { getToken } from "./token";


export const getCategories =(page, take = 100)=> {
    return axios.get(`${API}categories?page=${page}&take=${take}`, {
      headers: {
        authorization: getToken(),
      },
    });
  }
