import styled from "styled-components";
import React, { FunctionComponent } from "react";
import { ReactComponent as AccountsIcon } from "../../Asserts/Icons/accounts.svg";
import { ReactComponent as ClientsIcon } from "../../Asserts/Icons/clients.svg";
import { ReactComponent as ReportsIcon } from "../../Asserts/Icons/reports.svg";
import { ReactComponent as SettingsIcon } from "../../Asserts/Icons/settings.svg";
import { ReactComponent as DiscusIcon } from "../../Asserts/Icons/discussions.svg";
import { Link, useLocation } from "react-router-dom";
import { themeColors } from "../../themeColors";

export interface SideBarMenuItem {
  link: string;
  label: string;
  img: FunctionComponent;
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
  width: 200px;
`;
const SideBarList = styled.ul``;
const NavContainer = styled.li``;
const NavBarLink = styled(Link)``;
const LogoText = styled.p`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: ${themeColors.gray10};
`;

export const SideBar = () => {
  const location = useLocation();
  const itemIsActive = (item: SideBarMenuItem) =>
    location.pathname.endsWith(item.link);

  return (
    <SideBarContainer>
      <LogoText>StaffPro</LogoText>
      <SideBarList>
        {sideBarMenu.map((item) => (
          <NavContainer
            key={item.label}
            className={itemIsActive(item) ? "active" : ""}
          >
            <NavBarLink
              to={item.link}
              className={itemIsActive(item) ? "active" : ""}
            >
              <label>{item.label}</label>
            </NavBarLink>
          </NavContainer>
        ))}
      </SideBarList>
    </SideBarContainer>
  );
};
