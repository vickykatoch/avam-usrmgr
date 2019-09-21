import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/root-reducer";

const configureStore = () => createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default configureStore;
