import { BASE_PATH } from "../utils/constants";
import { authFech } from "../utils/fecth";
import { size } from "lodash";

export const isFavoriteAPI = async (idUser, idGame, logout) => {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
    return authFech(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addFavoriteAPI = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteAPI(idUser, idGame, logout);

    if (size(dataFound) > 0 || !dataFound) {
      return "Este juego ya esta agregado a favoritos";
    } else {
      const url = `${BASE_PATH}/favorites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users_permissions_user: idUser,
          game: idGame,
        }),
      };

      const result = await authFech(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeFavoriteAPI = async (idUser, idGame, logout) => {
  try {
    const foundData = await isFavoriteAPI(idUser, idGame, logout);

    if (size(foundData) > 0) {
      const url = `${BASE_PATH}/favorites/${foundData[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result = await authFech(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFavoriteAPI = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}`;
    const resul = await authFech(url, null, logout);
    return resul;
  } catch (error) {
    console.log(error);
    return null;
  }
};
