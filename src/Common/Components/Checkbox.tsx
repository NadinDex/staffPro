import { InputProps, ReactInputProps } from "./Input/Input";
import React from "react";
import styled from "styled-components";
import { themeColors } from "../Constants/themeColors";

const CheckboxContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  input {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
    background: ${themeColors.gray1};
    border: 1px solid ${themeColors.gray5};
    border-radius: 2px;
    margin: 2px 8px 0 0;
  }
  input:checked {
    width: 16px;
    height: 16px;
    background: ${themeColors.blue6};
    border: none;
    border-radius: 2px;
  }
  label {
    margin-left: auto;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    color: ${themeColors.gray8};
  }
  a {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${themeColors.blue6};
    text-decoration: none;
  }
`;

export type CheckboxProps = {
  label?: string;
  error?: string;
  //initialValue: boolean;
  value?: boolean;
} & ReactInputProps;

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<CheckboxProps>
>((props: CheckboxProps, ref) => {
  const { children, error, ...rest } = props;
  return (
    <CheckboxContainer>
      <input type="checkbox" {...rest} ref={ref} />
      <div>
        <label>{props.label}</label>
        {children}
      </div>
    </CheckboxContainer>
  );
});
