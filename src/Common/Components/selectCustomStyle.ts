import { themeColors } from "../../themeColors";
import { OptionTypeValueNumber } from "../Constants/selectOptions";

export const selectCustomStyles = (width?: string) => {
  return {
    placeholder: (provided: any, state: any) => {
      return {
        ...provided,
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
      };
    },
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid " + themeColors.gray5,
      color: state.isSelected ? themeColors.blue6 : themeColors.gray8,
      backgroundColor: state.isSelected ? themeColors.blue1 : themeColors.gray1,
    }),
    control: (provided: any, state: any) => {
      return {
        ...provided,
        borderRadius: "2px",
        height: "38px",
        cursor: "pointer",
        width: width,
      };
    },
  };
};
