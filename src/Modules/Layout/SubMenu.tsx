import React from "react";
import styled from "styled-components";
import { themeColors } from "../../themeColors";
import { sideBarMenu, SideBarMenuItem } from "./SideBar";
import { useLocation } from "react-router-dom";

const SubMenuContainer = styled.div`
  display: flex;
  gap: 32px;
  background: ${themeColors.gray1};
  width: fit-content;
  padding 1px 22px 0 22px;
`;
const ItemContainer = styled.div`
  height: 44px;
  display: flex;
  justify-content: center;
  box-shadow: ${(props) =>
    props.className?.includes("active")
      ? "inset 0px -2px 0px " + themeColors.blue6
      : "none"};

  span {
    margin: 11px 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: ${(props) =>
      props.className?.includes("active")
        ? themeColors.blue6
        : themeColors.gray8};
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
        <ItemContainer className="active">
          <span>{item}</span>
        </ItemContainer>
      ))}
    </SubMenuContainer>
  );
};
