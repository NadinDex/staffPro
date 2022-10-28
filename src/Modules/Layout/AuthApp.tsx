import { useAppSelector, useAppDispatch } from "../../Config/Redux/core";
import { AppStateType } from "../../Config/Redux/configureStore";
import { useState, useCallback } from "react";
import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import React from "react";
import { SideBar } from "./SideBar";
import styled from "styled-components";
import { Header } from "./Header";
import { SubMenu } from "./SubMenu";
import { themeColors } from "../../themeColors";
import { theme } from "../../Common/Constants/theme";
import {
  PageBGSeparator,
  PageContainer,
} from "../../Common/Components/pageStyles";

const FullScreenContainer = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: ${theme.mobile}) {
    flex-direction: column;
  }
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 200px;
  @media (max-width: ${theme.mobile}) {
    margin-left: 0;
  }
`;

export const AuthApp: React.FunctionComponent = () => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const user = useAppSelector((state: AppStateType) => state.user.currentUser);

  const toggleMobileSideBar = useCallback(() => {
    setMobileSideBarOpen(!mobileSideBarOpen);
  }, [mobileSideBarOpen]);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = location.pathname;

  if (!user && !path.includes("unauth")) {
    return <Navigate to="/unauth/login" />;
  }

  return (
    <FullScreenContainer>
      <SideBar />
      <MainContainer>
        <Header />

        <Outlet />
      </MainContainer>
    </FullScreenContainer>
  );
};
