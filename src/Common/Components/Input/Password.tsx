import { Input } from "./Input";
import React from "react";

export const Password = React.forwardRef((props: any, ref) => {
  const { children, ...rest } = props;
  return (
    <Input {...rest} type="password" ref={ref}>
      {children}
    </Input>
  );
});
