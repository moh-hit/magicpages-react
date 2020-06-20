import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import DataBaseReducer from "./DataBaseReducer"

const RootReducer = combineReducers({
  AuthReducer,
  DataBaseReducer
});
export default RootReducer;
