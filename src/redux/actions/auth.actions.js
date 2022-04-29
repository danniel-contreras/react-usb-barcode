import { decodeToken, setToken, removeToken } from "../../api/token";
import { types } from "../types";

export const newLogin = (token, role, store) => {
  return (dispatch) => {
    setToken(token, role, store);
    dispatch(login(decodeToken(token)));
  };
};

export function login(data) {
  return {
    type: types.LOGIN,
    payload: data,
  };
}

export const newLoggout = () => {
  return (dispatch) => {
    removeToken();
    dispatch(loggout());
  };
};

export function loggout() {
  return {
    type: types.LOGGOUT,
    payload: {},
  };
}
