import Select from "react-select";
import { ControllerRenderProps } from "react-hook-form";
import React from "react";
import { selectCustomStyles } from "../../Common/Components/selectCustomStyle";
import { OptionTypeValueNumber } from "../../Common/Constants/selectOptions";
import styled from "styled-components";
import { themeColors } from "../../themeColors";

type SelectComponentProps = {
  error?: string;
  options: OptionTypeValueNumber[]; // | OptionTypeValueString[];
  width?: string;
  placeholder?: string;
  className?: string;
} & ControllerRenderProps;

export const StyledSelect = styled(Select)<SelectComponentProps>`
  boxshadow: ${(props: SelectComponentProps) =>
    props.className?.includes("error")
      ? "0px 0px 4px rgba(245, 34, 45, 0.5)"
      : "none"};

  .Select__control {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }

    border: ${(props: SelectComponentProps) =>
      props.className?.includes("error")
        ? "1px solid " + themeColors.red6
        : "1px solid " + themeColors.gray5};

    box-shadow: ${(props: SelectComponentProps) =>
      props.className?.includes("error")
        ? "0px 0px 4px rgba(245, 34, 45, 0.5)"
        : "none"};
  }
`;

export const SelectComponent = React.forwardRef(
  (props: SelectComponentProps, ref: any) => {
    const {
      error,
      onChange,
      onBlur,
      value,
      options,
      width,
      placeholder,
    } = props;

    return (
      <StyledSelect
        name=""
        placeholder={placeholder}
        classNamePrefix="Select"
        styles={selectCustomStyles(width)}
        className={error ? "error" : ""}
        options={options}
        menuPlacement="auto"
        onChange={(newValue: any) => {
          onChange((newValue as OptionTypeValueNumber).label);
        }}
        onBlur={onBlur}
        ref={ref}
        value={
          options
            ? options.find((o: OptionTypeValueNumber) => o.value === value)
            : undefined
        }
        inputValue=""
        onInputChange={() => {}}
        onMenuOpen={() => {}}
        onMenuClose={() => {}}
      />
    );
  }
);
