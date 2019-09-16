import rootReducer from "./reducers/root-reducer";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { IAppState, DEFAULT_APP_STATE } from "./models";

const configureStore = () => {
  return createStore(
    rootReducer,
    // DEFAULT_APP_STATE,
    applyMiddleware(thunkMiddleware)
  );
};

export default configureStore;
