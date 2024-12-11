// app/redux/reducers/index.js
import { combineReducers } from "redux";
// import authReducer from "./authReducers";  // Проверьте правильность пути
import errorReducer from "./errorReducers";
import appReducers from "./appReducers";

export default combineReducers({
  // auth: authReducer,
  errors: errorReducer,
  app: appReducers,
});
