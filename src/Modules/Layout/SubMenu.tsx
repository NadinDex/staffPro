import React from "react";
import styled from "styled-components";
import { themeColors } from "../../themeColors";
import { sideBarMenu, SideBarMenuItem } from "./SideBar";
import { useLocation } from "react-router-dom";

const SubMenuContainer = styled.div`
  display: flex;
  gap: 32px;
  background: ${themeColors.gray1};
  width: content;
`;
const ItemContainer = styled.div`
  height: 44px;
  box-shadow: ${(props) =>
    props.className === "active"
      ? "inset 0px -2px 0px " + themeColors.blue6
      : "none"};

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: ${(props) =>
      props.className === "active" ? themeColors.blue6 : themeColors.gray8};
  }
`;

export const SubMenu = () => {
  const path = useLocation().pathname;
  const subItems = sideBarMenu.find((x: SideBarMenuItem) => x.link == path)
    ?.subItems;

  if (!subItems) return <></>;

  return (
    <SubMenuContainer>
      {subItems.map((item) => (
        <ItemContainer className="active1">
          <span>{item}</span>
        </ItemContainer>
      ))}
    </SubMenuContainer>
  );
};
