import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clientsReducer from "../../Modules/Clients/clientsSlice";
import accountReducer from "../../Modules/Accounts/accountSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  clients: clientsReducer,
  accounts: accountReducer,
});
