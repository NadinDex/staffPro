import { Input } from "./Input";
import React from "react";
export const Password = (props: any) => {
  const { children, ...rest } = props;
  return (
    <Input {...rest} type="password">
      {children}
    </Input>
  );
};
