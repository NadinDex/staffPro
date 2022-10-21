import styled from "styled-components";
import {
  HTMLInputTypeAttribute,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import { themeColors } from "../../../themeColors";
import React from "react";
import { StyledInputContainer, ErrorInputSpan } from "./styled";

export type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

/*export const Input = (props: ReactInputProps) => {
  const { children, ...rest } = props;
  return <StyledInput {...rest}>{children}</StyledInput>;
};*/

export type InputProps = {
  error?: string;
  icon?: string;
  iconClick?: Function;
} & ReactInputProps;

export const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>
>((props: InputProps, ref) => {
  const { children, className, error, icon, iconClick, ...rest } = props;

  return (
    <StyledInputContainer error={error} icon={icon}>
      <input ref={ref} {...rest}>
        {children}
      </input>
      {error && <ErrorInputSpan title={error}>{error}</ErrorInputSpan>}
      {icon && (
        <div onClick={() => iconClick?.()}>
          <img src={icon} onClick={() => iconClick?.()} />
        </div>
      )}
    </StyledInputContainer>
  );
});
