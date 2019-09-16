import { combineReducers, Reducer } from "redux";
import me from "./me-reducer";
import sideBarState from "./side-bar-reducer";
import { IAppState } from "../models";

const rootReducer = combineReducers<IAppState>({
  me,
  sideBarState
});

export default rootReducer;
