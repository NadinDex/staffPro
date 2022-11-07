import React from "react";
import { InputProps } from "./Input";
import { InputNumber, InputNumberProps } from "antd";
import { CurrencyContainer } from "./styled";

export const CurrencyInput = React.forwardRef(
  (
    props: InputNumberProps & {
      children?: React.ReactNode;
      error?: string;
    },
    ref?: React.Ref<HTMLInputElement> | undefined
  ) => {
    const { children, className, error, style, ...rest } = props;
    return (
      <CurrencyContainer
        error={error}
        className={error ? "error" : ""}
        style={style}
      >
        <InputNumber
          ref={ref}
          {...rest}
          defaultValue={0}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
        >
          {children}
        </InputNumber>
      </CurrencyContainer>
    );
  }
);
