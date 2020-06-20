import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import combineReducer from "./reducers";

const store = createStore(
  combineReducer,
  {},
  applyMiddleware(thunk, createLogger())
);

export default store;
