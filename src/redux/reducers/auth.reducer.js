import { decodeToken, isUserLoggedApi, getToken } from "../../api/token";
import { types } from "../types";

const user = isUserLoggedApi() ? decodeToken(getToken()) : undefined;
const initialState = isUserLoggedApi()
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: undefined };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case types.LOGGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    default:
      return state;
  }
};