import jwtDecode from "jwt-decode";

export const setToken = (token, store, role) => {
  localStorage.setItem("role", role);
  localStorage.setItem("token", token);
  localStorage.setItem("store", store);
};
export const decodeToken = (token) => {
  return jwtDecode(token);
};
export const getToken = () => {
  return localStorage.getItem("token");
};
export const getStore = () => {
    return localStorage.getItem("store");
  };
export const removeToken = () => {
  localStorage.removeItem("token");
};
export const isExpiredToken = (token) => {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeOut = expire - Date.now();
  if (timeOut < 0) {
    return true;
  }
  return false;
};
export const isUserLoggedApi = () => {
  const token = getToken();
  if (!token) {
    removeToken();
    return false;
  }
  if (isExpiredToken(token)) {
    removeToken();
    return false;
  }
  return true;
};
