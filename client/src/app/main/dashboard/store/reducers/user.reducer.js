import * as Actions from "../actions";

const initialState = null;

const userReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_TEAMS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
