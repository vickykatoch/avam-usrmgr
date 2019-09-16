import rootReducer from "./reducers/root-reducer";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};

export default configureStore;
