import * as Actions from "../actions";

const initialState = {
  role: [], //guest
  data: {
    displayName: "Adeel Guest",
    photoURL: "assets/images/avatars/Velazquez.jpg",
    email: "adeeltahir19@gmail.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"]
  }
};

const user = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
