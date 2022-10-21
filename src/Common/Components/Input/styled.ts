import styled from "styled-components";
import { themeColors } from "../../../themeColors";
import { InputProps } from "./Input";

export const StyledInput = styled.input`
background: ${themeColors.gray1};
border: 1px solid ${themeColors.gray5};
border-radius: 2px;

font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: ${themeColors.gray8}

::-webkit-input-placeholder { /* Edge */
    color: ${themeColors.gray6};
  }
  
:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${themeColors.gray6};
  }
::placeholder {
    color: ${themeColors.gray6};
  }
`;

export const StyledInputContainer = styled.div<InputProps>``;

export const ErrorInputSpan = styled.span``;
