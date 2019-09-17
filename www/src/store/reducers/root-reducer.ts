import { combineReducers } from "redux";
import me from "./me-reducer";
import sideBarState from "./side-bar-reducer";
import { IAppState } from "../models";
import usersState from "./users-reducer";

const rootReducer = combineReducers<IAppState>({
  meState: me,
  sideBarState,
  usersState
});

export default rootReducer;
