import Select from "react-select";
import { ControllerRenderProps } from "react-hook-form";
import React, { useRef, useEffect } from "react";
import { selectCustomStyles } from "./selectCustomStyle";
import { OptionTypeValueNumber } from "../Constants/selectOptions";
import styled from "styled-components";
import { themeColors } from "../Constants/themeColors";

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
  .Select__placeholder {
    color: ${themeColors.gray6};
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

    const getValueOblects = (value: number) => {
      return value && options
        ? options.find((o: OptionTypeValueNumber) => o.value === value)
        : null;
    };
    console.log(value);
    return (
      <StyledSelect
        name=""
        placeholder={placeholder}
        classNamePrefix="Select"
        styles={selectCustomStyles(width)}
        className={error ? "error" : ""}
        options={options}
        menuPlacement="auto"
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        value={value}
        inputValue=""
        onInputChange={() => {}}
        onMenuOpen={() => {}}
        onMenuClose={() => {}}
      />
    );
  }
);
/*
getOptionLabel={(option:OptionTypeValueNumber) => option.label}
        getOptionValue={(option:OptionTypeValueNumber) => option.value}
*/
