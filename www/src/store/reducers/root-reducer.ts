import { combineReducers } from "redux";
import me from "./me-reducer";
import sideBarState from "./side-bar-reducer";
import { IAppState } from "../models";
import users from "./user-reducer";

const rootReducer = combineReducers<IAppState>({
  me,
  sideBarState,
  users
});

export default rootReducer;
