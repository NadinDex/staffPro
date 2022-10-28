import { Navigate } from "react-router-dom";
import React from "react";
import { useAppDispatch } from "../../Config/Redux/core";
import { userActions } from "../../Config/Redux/userSlice";

export const Logout = () => {
  const dispacth = useAppDispatch();
  dispacth(userActions.logoutUser());
  return <Navigate to="/unauth/login" />;
};
