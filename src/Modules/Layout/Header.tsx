import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { sideBarMenu, SideBarMenuItem } from "./SideBar";
import { themeColors } from "../../themeColors";

const HeaderContainer = styled.div`
  height: 125px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 11px 22px;
  background: ${themeColors.gray1};

  color: ${themeColors.gray7};
`;
const HeaderTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: ${themeColors.gray9};
`;
const HomeLink = styled(Link)`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray7};
  text-decoration: none;
`;
const CurrentPageLabel = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray8};
`;

export const Header = () => {
  const path = useLocation().pathname;
  const pageTitle = sideBarMenu.find((x: SideBarMenuItem) => x.link == path)
    ?.label;
  return (
    <HeaderContainer>
      <div>
        <HomeLink to="/">Главная</HomeLink> /{" "}
        <CurrentPageLabel>{pageTitle}</CurrentPageLabel>
      </div>
      <HeaderTitle>{pageTitle}</HeaderTitle>
    </HeaderContainer>
  );
};
