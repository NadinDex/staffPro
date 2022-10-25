import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React from "react";

interface ErrorLabelProps {
  text?: string;
}

const StyledLabel = styled.label`
  color: ${themeColors.red6};
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;
export const ErrorInputLabel = (props: ErrorLabelProps) => {
  return <StyledLabel>{props.text}</StyledLabel>;
};
