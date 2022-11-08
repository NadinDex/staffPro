import React from "react";
import { InputProps } from "./Input";
import { InputNumber, InputNumberProps } from "antd";
import { CurrencyContainer } from "./styled";

function getCurrencySymbol(locale: string, currency: string) {
  return (0)
    .toLocaleString(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

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
          prefix={getCurrencySymbol("en", "USD")}
        >
          {children}
        </InputNumber>
      </CurrencyContainer>
    );
  }
);
