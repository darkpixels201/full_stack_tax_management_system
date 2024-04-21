import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./reducers/profileReducer";
import authReducer from './reducers/authReducer'
import userReducer from "./reducers/userReducer";

export default combineReducers({
    profileReducer:profileReducer,
    authReducer : authReducer,
    userReducer: userReducer
  });