import React from "react";
import styled from "styled-components";
import { themeColors } from "../../themeColors";
import { useLocation } from "react-router-dom";
import { sideBarMenu, SideBarMenuItem } from "../../Common/Constants/menu";

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

  a {
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
  const subItems = sideBarMenu.find(
    (x: SideBarMenuItem) => x.link === "/" + path.split("/")[1]
  )?.subItems;

  if (!subItems) return <></>;
  console.log(path);
  return (
    <SubMenuContainer>
      {subItems.map((item) => (
        <ItemContainer className={path.endsWith(item.link) ? "active" : ""}>
          <a href={item.link}>{item.label}</a>
        </ItemContainer>
      ))}
    </SubMenuContainer>
  );
};
