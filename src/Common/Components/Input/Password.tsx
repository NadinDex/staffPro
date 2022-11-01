import { Input, InputProps } from "./Input";
import React, { useState } from "react";
import unhidePass from "../../../Asserts/Icons/unhidePass.svg";
import hidePass from "../../../Asserts/Icons/hidePass.svg";

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
      icon={unhide ? hidePass : unhidePass}
      iconClick={() => {
        setUnhide(!unhide);
      }}
    >
      {children}
    </Input>
  );
});
