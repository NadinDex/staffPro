import { Input, InputProps } from "./Input";
import React, { useState } from "react";
import unhidePass from "../../../Asserts/Icons/unhidePass.svg";

export const Password = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>
>((props: InputProps, ref) => {
  const { children, ...rest } = props;
  const [unhide, setUnhide] = useState<Boolean>(false);
  return (
    <Input
      {...rest}
      type={unhide ? "text" : "password"}
      ref={ref}
      icon={unhide ? unhidePass : unhidePass}
      iconClick={() => {
        setUnhide(!unhide);
      }}
    >
      {children}
    </Input>
  );
});
