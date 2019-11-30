import { combineReducers } from "redux";
import widgets from "./widgets.reducer";
import projects from "./projects.reducer";
import users from "./users.reducer";

const reducer = combineReducers({
  widgets,
  projects,
  users
});

export default reducer;
