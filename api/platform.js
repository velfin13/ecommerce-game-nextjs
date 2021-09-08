import { BASE_PATH } from "../utils/constants";
import { authFech } from "../utils/fecth";

export const getPlatformAPI = async () => {
  try {
    const url = `${BASE_PATH}/platforms?_sort=position:ASC`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};
