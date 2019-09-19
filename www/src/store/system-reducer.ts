import { combineReducers, Reducer } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import rootReducer from "./reducers/root-reducer";
import { IAppState } from "./models";

export interface ICombinedRouterAppState {
  appState: IAppState;
  router: RouterState;
}

const createSystemReducer = (history: History<any>) : Reducer<ICombinedRouterAppState> =>
  combineReducers({
    router: connectRouter(history),
    appState: rootReducer
  });
export default createSystemReducer;
