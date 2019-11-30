import config from "app/config";
import axios from "axios";
export const GET_USER = "GET_USER";

export function getUserData(userName) {
  const request = axios.get(`${config.baseURL}/api/users/${userName}`);
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_USER,
        payload: response.data
      })
    );
}
