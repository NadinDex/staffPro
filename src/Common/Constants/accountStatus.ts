import { themeColors } from "../../themeColors";
import { OptionTypeValueNumber } from "./selectOptions";
export interface AccountStatusType extends OptionTypeValueNumber {
  value: number;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
export const AccountStatus: AccountStatusType[] = [
  {
    value: 0,
    label: "Оплачено",
    color: themeColors.green6,
    bgColor: themeColors.green1,
    borderColor: themeColors.green3,
  },
  {
    value: 1,
    label: "Ожидание оплаты",
    color: themeColors.orange6,
    bgColor: themeColors.orange1,
    borderColor: themeColors.orange3,
  },
  {
    value: 2,
    label: "Просрочено",
    color: themeColors.red6,
    bgColor: themeColors.red1,
    borderColor: themeColors.red3,
  },
  {
    value: 3,
    label: "Завершено",
    color: themeColors.geekblue6,
    bgColor: themeColors.geekblue1,
    borderColor: themeColors.geekblue3,
  },
];
