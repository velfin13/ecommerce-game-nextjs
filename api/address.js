import { BASE_PATH } from "../utils/constants";
import { authFech } from "../utils/fecth";

export const addAdressAPI = async (data, logout) => {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const result = await authFech(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
};

export const getAdressUserAPI = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/addresses?users_permissions_user=${idUser}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await authFech(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
};

export const deleteAdressUserAPI = async (idAddress, logout) => {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await authFech(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
};

export const updateAdressUserAPI = async (idAddress, data, logout) => {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const result = await authFech(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
};
