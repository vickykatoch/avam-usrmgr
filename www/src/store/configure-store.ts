import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSystemReducer from "./system-reducer";
export const history = createBrowserHistory();

const configureStore = () =>
  createStore(createSystemReducer(history), compose(applyMiddleware(routerMiddleware(history), thunkMiddleware)));

export default configureStore;
