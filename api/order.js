import { BASE_PATH } from "../utils/constants";
import { authFech } from "../utils/fecth";

export const getOrderApi = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:DESC&users_permissions_user=${idUser}`;
    const resul = await authFech(url, null, logout);
    return resul;
  } catch (error) {
    console.log(error);
    return null;
  }
};
