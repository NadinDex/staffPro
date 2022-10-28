import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { themeColors } from "../../themeColors";
import SlashSvg from "../../Asserts/Icons/slash.svg";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import { sideBarMenu, SideBarMenuItem } from "../../Common/Constants/menu";
import { theme } from "../../Common/Constants/theme";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 22px;
  background: ${themeColors.gray1};

  color: ${themeColors.gray7};
  @mobile (max-width: ${theme.mobile}) {
    padding: 10px 16px;
    gap: 12px px;
  }
`;
const HeaderTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: ${themeColors.gray9};
  margin: 0;
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
const FirstLineDiv = styled.div`
  display: inline;

  svg {
    width: 24px;
    height: 16px;
  }
`;

export const Header = () => {
  const path = useLocation().pathname;
  const pageTitle = sideBarMenu.find((x: SideBarMenuItem) => x.link == path)
    ?.label;
  return (
    <HeaderContainer>
      <FirstLineDiv>
        <HomeLink to="/">Главная</HomeLink>

        <SVG src={SlashSvg} width="24px" height="16px" />
        <CurrentPageLabel>{pageTitle}</CurrentPageLabel>
      </FirstLineDiv>
      <HeaderTitle>{pageTitle}</HeaderTitle>
    </HeaderContainer>
  );
};
