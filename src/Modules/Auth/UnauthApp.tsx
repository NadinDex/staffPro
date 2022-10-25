import { useAppSelector } from "../../Config/Redux/core";
import { AppStateType } from "../../Config/Redux/configureStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UnauthApp: React.FunctionComponent = () => {
  const user = useAppSelector((store: AppStateType) => store.user.currentUser);
  if (user) {
    return <Navigate to="/accounts" replace />;
  }

  return <Outlet />;
};
