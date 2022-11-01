import styled from "styled-components";
import { themeColors } from "../../themeColors";
import { theme } from "../../Common/Constants/theme";

export const ForgotPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;
  width: 330px;

  background: ${themeColors.gray1};
  border-radius: 2px;

  @media (max-width: ${theme.mobile}) {
    width: calc(100% - 32px);
    padding: 24px 16px 32px 16px;
  }
`;

export const FormText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray8};
  margin: 0;
`;
