import { useAppSelector, useAppDispatch } from "../../Config/Redux/core";
import { AppStateType } from "../../Config/Redux/configureStore";
import { useState, useCallback } from "react";
import {
  useLocation,
  useNavigate,
  Outlet,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import { SideBar } from "./SideBar";
import styled from "styled-components";
import { Header } from "./Header";
import { SubMenu } from "./SubMenu";
import { themeColors } from "../../themeColors";

const FullScreenContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const PageBGSeparator = styled.div`
  background: ${themeColors.BG};
  padding: 24px;
`;
const PageContainer = styled.div`
  background: ${themeColors.gray1};
  padding: 24px;
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
        <SubMenu />
        <PageBGSeparator>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </PageBGSeparator>
      </MainContainer>
    </FullScreenContainer>
  );
};
