import { useAppSelector } from "../../Config/Redux/core";
import { AppStateType } from "../../Config/Redux/configureStore";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { notification } from "antd";

export const UnauthApp: React.FunctionComponent = () => {
  const path = useLocation().pathname;
  useEffect(() => {
    notification.destroy();
  }, [path]);

  const user = useAppSelector((store: AppStateType) => store.user.currentUser);
  if (user) {
    return <Navigate to="/accounts" replace />;
  }

  return <Outlet />;
};
