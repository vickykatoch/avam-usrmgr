import { combineReducers } from "redux";
import me from "./me-reducer";
import sideBarState from "./side-bar-reducer";
import { IAppState } from "../models";
import usersState from "./users-reducer";
import rolesState from "./roles-reducer";
import resourcesState from "./resources-reducer";

const rootReducer = combineReducers<IAppState>({
  meState: me,
  sideBarState,
  userState: usersState,
  rolesState,
  resourcesState
});

export default rootReducer;
