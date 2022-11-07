import styled from "styled-components";
import { themeColors } from "../Constants/themeColors";

export const ButtonStyled = styled.button`
  padding: 8px 16px;

  height: 40px;
  background: ${themeColors.blue6};
  border-radius: 2px;
  border: none;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: ${themeColors.gray1};
`;

export const ButtonStyled32 = styled.button`
  padding: 5px 16px;

  height: 32px;
  background: ${themeColors.blue6};
  border-radius: 2px;
  border: none;

  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  color: ${themeColors.gray1};
`;

export const CancelButtonStyled32 = styled.button`
  padding: 5px 16px;
  height: 32px;
  background: ${themeColors.gray1};
  border: 1px solid ${themeColors.gray5};
  border-radius: 2px;

  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray8};
`;

export const AccountButtonCancelStyled = styled.button`
  padding: 5px 16px;
  width: 94px;
  height: 32px;

  background: ${themeColors.gray1};
  border: 1px solid ${themeColors.gray5};
  border-radius: 2px;

  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  color: ${themeColors.gray8};
`;
export const AccountButtonStyled = styled(ButtonStyled)`
  padding: 5px 16px;
  width: 92px;
  height: 32px;

  font-size: 14px;
  line-height: 22px;
`;
