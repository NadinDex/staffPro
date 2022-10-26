import styled from "styled-components";
import React, { FunctionComponent, useState } from "react";
import AccountsIcon from "../../Asserts/Icons/accounts.svg";
import ClientsIcon from "../../Asserts/Icons/clients.svg";
import ReportsIcon from "../../Asserts/Icons/reports.svg";
import SettingsIcon from "../../Asserts/Icons/settings.svg";
import DiscusIcon from "../../Asserts/Icons/discussions.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { themeColors } from "../../themeColors";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import { theme } from "../../Common/Constants/theme";
import mobileMenu from "../../Asserts/Icons/mobileMenu.svg";

export interface SideBarMenuItem {
  link: string;
  label: string;
  img: string;
  subItems?: string[];
}
export const sideBarMenu: SideBarMenuItem[] = [
  {
    link: "/reports",
    label: "Отчеты",
    img: ReportsIcon,
    subItems: ["Все отчеты", "Избранное"],
  },
  {
    link: "/accounts",
    label: "Счета",
    img: AccountsIcon,
    subItems: [
      "Все счета",
      "Ожидание оплаты",
      "Оплачено",
      "Просрочено",
      "Завершено",
    ],
  },
  {
    link: "/clients",
    label: "Клиенты",
    img: ClientsIcon,
  },
  {
    link: "/discussions",
    label: "Общение",
    img: DiscusIcon,
  },
  {
    link: "/settings",
    label: "Настройки",
    img: SettingsIcon,
    subItems: ["Редактирование", "Привязанные аккаунты"],
  },
];

const SideBarContainer = styled.div`
  flex: 0 0 200px;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  width: 200px;

  @media (max-width: ${theme.mobile}) {
    flex: 0 0 52px;
    width: 100%;
    padding: 10px 16px;
    background: ${themeColors.gray2};
  }
`;
const SideBarList = styled.div`
  height: fit-content;
  width: 100%;
  @media (max-width: ${theme.mobile}) {
    height: 0;
    width: 100%;
    overflow: hidden;
  }
`;
const NavContainer = styled.div``;
const NavBarLink = styled.div`
  height: 22spx;
  padding: 9px 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) =>
    props.className?.includes("active")
      ? themeColors.blue1
      : themeColors.gray1};
  box-shadow: ${(props) =>
    props.className?.includes("active")
      ? "inset -3px 0" + themeColors.blue6
      : "none"};
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) =>
    props.className?.includes("active")
      ? themeColors.blue6
      : themeColors.gray8};

  svg {
    width: 14px;
  }
`;
const LogoText = styled.p`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin: 0 0 4px 0;
  color: ${themeColors.gray10};
  @media (max-width: ${theme.mobile}) {
    text-align: left;
  }
`;
const MobileMenuButton = styled.img`
  position: absolute;
  top: 17.75px;
  right: 18.5px;
  //background: url(${mobileMenu});
  width: 0px;
  height: 16.5px;
  @media (max-width: ${theme.mobile}) {
    width: 18.75px;
  }
`;

export const SideBar = () => {
  const [currentItem, setCurrentItem] = useState(sideBarMenu[0]);
  const navigate = useNavigate();
  const location = useLocation();
  const itemIsActive = (item: SideBarMenuItem) =>
    location.pathname.endsWith(item.link);

  const onItemClick = (item: SideBarMenuItem) => {
    setCurrentItem(item);
    navigate(item.link);
  };

  return (
    <SideBarContainer>
      <LogoText>StaffPro</LogoText>
      <MobileMenuButton src={mobileMenu} />
      <SideBarList>
        {sideBarMenu.map((item) => (
          <NavContainer
            key={item.label}
            className={itemIsActive(item) ? "active" : ""}
          >
            <NavBarLink
              onClick={() => onItemClick(item)}
              className={itemIsActive(item) ? "active" : ""}
            >
              <SVG
                src={item.img}
                fill={itemIsActive(item) ? "#1890FF" : "#595959"}
              />
              <label>{item.label}</label>
            </NavBarLink>
          </NavContainer>
        ))}
      </SideBarList>
    </SideBarContainer>
  );
};
