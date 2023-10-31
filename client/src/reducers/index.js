import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import appReducers from "./appReducers";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  app: appReducers,
});