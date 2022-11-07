import styled from "styled-components";
import { themeColors } from "../../Constants/themeColors";
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

export const StyledInputContainer = styled.div<InputProps>`
  height: 38px;
  width: calc(100% - 2px);
  border: 1px solid
    ${(props) =>
      props.error || props.className === "error"
        ? themeColors.red6
        : themeColors.gray5};
  box-shadow: ${(props) =>
    props.error || props.className
      ? "0px 0px 4px rgba(245, 34, 45, 0.5)"
      : "none"};
  input {
    margin: 8px 12px;
    border: none;
    width: calc(100% - ${(props) => (props.icon ? "50px" : "24px")});
    height: 22px;
    box-shadow: none;
    background: ${themeColors.gray1};
    color: ${themeColors.gray8};
  }
  input:-internal-autofill-selected {
    background: ${themeColors.gray1};
  }
  input:hover {
    border: none;
    background: ${themeColors.gray1};
  }
  input:active {
    border: none;
    background: ${themeColors.gray1};
  }
  input:focus {
    outline-style: none;
    border: none;
    background: ${themeColors.gray1};
  }
  input:disabled {
    color: ${themeColors.gray6};
    background: ${themeColors.gray2};
  }
  input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${themeColors.gray6};
    opacity: 1; /* Firefox */
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${themeColors.gray6};
  }

  input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${themeColors.gray6};
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

export const ErrorInputSpan = styled.span``;
