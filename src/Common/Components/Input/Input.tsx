import styled from "styled-components";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import React from "react";
import { StyledInputContainer, ErrorInputSpan } from "./styled";

export type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  error?: string;
  icon?: string;
  iconClick?: Function;
} & ReactInputProps;

export const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>
>((props: InputProps, ref) => {
  const {
    type,
    children,
    className,
    error,
    icon,
    iconClick,
    style,
    ...rest
  } = props;

  return (
    <StyledInputContainer
      error={error}
      className={error ? "error" : ""}
      icon={icon}
      style={style}
    >
      <input ref={ref} type={type} {...rest}>
        {children}
      </input>
      {icon && (
        <div onClick={() => iconClick?.()}>
          <img src={icon} onClick={() => iconClick?.()} />
        </div>
      )}
    </StyledInputContainer>
  );
});
