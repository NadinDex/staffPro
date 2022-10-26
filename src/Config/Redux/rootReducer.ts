import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clientsReducer from "../../Modules/Clients/clientsSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  clients: clientsReducer,
});
