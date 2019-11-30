import config from "app/config";
import axios from "axios";
export const GET_TEAMS = "GET_TEAMS";

export function getTeamData() {
  const request = axios.get(`${config.baseURL}/api/v1/user/teams`);
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_TEAMS,
        payload: response.data
      })
    );
}
