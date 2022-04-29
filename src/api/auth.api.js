import axios from "axios";
import { API } from "../utils/urls";

export const login = (data) => {
  return axios.post(`${API}auth/login`, data);
};
