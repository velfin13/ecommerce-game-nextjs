import { BASE_PATH } from "../utils/constants";

export const getLastGame = async (limit) => {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = `_sort=createdAt:DESC`;
    const url = `${BASE_PATH}/games?${limitItems}&${sortItem}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const getGamePlatformAPI = async (platform, limit, start) => {
  try {
    const limitItem = `_limit=${limit}`;
    const platformUrl = `platform.url=${platform}`;
    const orderURL = `_sort=createdAt:desc`;
    const startURL = `_start=${start}`;
    const url = `${BASE_PATH}/games?${platformUrl}&${limitItem}&${orderURL}&${startURL}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const getTotalGamesPlatformAPI = async (platform) => {
  try {
    const url = `${BASE_PATH}/games/count?platform.url=${platform}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const getGameByIdAPI = async (path) => {
  try {
    const url = `${BASE_PATH}/games?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const searchGameAPI = async (title) => {
  try {
    const url = `${BASE_PATH}/games?_q=${title}`;
    const response = await fetch(url);
    const resul = await response.json();
    return resul;
  } catch (error) {
    console.log(error);
    return null;
  }
};
