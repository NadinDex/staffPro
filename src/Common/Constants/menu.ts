import AccountsIcon from "../../Asserts/Icons/accounts.svg";
import ClientsIcon from "../../Asserts/Icons/clients.svg";
import ReportsIcon from "../../Asserts/Icons/reports.svg";
import SettingsIcon from "../../Asserts/Icons/settings.svg";
import DiscusIcon from "../../Asserts/Icons/discussions.svg";
import LogoutIcon from "../../Asserts/Icons/exit.svg";

export interface SubMenuItem {
  link: string;
  label: string;
}
export interface SideBarMenuItem {
  link: string;
  label: string;
  img: string;
  subItems?: SubMenuItem[];
  isLogout?: boolean;
}
export const sideBarMenu: SideBarMenuItem[] = [
  {
    link: "/reports",
    label: "Отчеты",
    img: ReportsIcon,
    subItems: [
      { label: "Все отчеты", link: "" },
      { label: "Избранное", link: "" },
    ],
  },
  {
    link: "/accounts",
    label: "Счета",
    img: AccountsIcon,
    subItems: [
      { label: "Все счета", link: "/accounts" },
      { label: "Ожидание оплаты", link: "/accounts/wait" },
      { label: "Оплачено", link: "/accounts/paid" },
      { label: "Просрочено", link: "/accounts/overdue" },
      { label: "Завершено", link: "/accounts/finish" },
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
    subItems: [
      { label: "Редактирование", link: "/settings" },
      { label: "Привязанные аккаунты", link: "/settings/acc" },
    ],
  },
  {
    link: "/logout",
    label: "Выход",
    img: LogoutIcon,
    isLogout: true,
  },
];
