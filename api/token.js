import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  const expireDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expireDate) {
    return true;
  }
  return false;
}
