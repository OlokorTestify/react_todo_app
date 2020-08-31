import { combineReducers } from "redux";
import todoReducer from "./todo";
import authReducer from "../reducers/auth";

const rootReducer = combineReducers({
  todo: todoReducer,
  auth: authReducer,
});

export default rootReducer;
