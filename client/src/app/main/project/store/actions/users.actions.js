import config from "app/config";
import axios from "axios";
export const GET_USERS = "GET_USERS";

export function getFreelancers() {
  const request = axios.get(`${config.baseURL}/api/users`);
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_USERS,
        payload: response.data
      })
    );
}
