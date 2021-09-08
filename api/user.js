import { BASE_PATH } from "../utils/constants";
import { authFech } from "../utils/fecth";

export const registerAPI = async (user) => {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const loginAPI = async (user) => {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, params);
    const resul = await response.json();
    return resul;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const resetPasswordAPI = async (email) => {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMeAPI = async (logout) => {
  try {
    const url = `${BASE_PATH}/users/me`;
    const result = await authFech(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
};

export const updateNameAPi = async (id, data, logout) => {
  try {
    const url = `${BASE_PATH}/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    
    const response = await fetch(url, params);
    const result = response.json();

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateEmailAPi = async (id, email, logout) => {
  try {
    const url = `${BASE_PATH}/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    const result = response.json();

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePasswordAPi = async (id, password, logout) => {
  try {
    const url = `${BASE_PATH}/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const response = await fetch(url, params);
    const result = response.json();

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
