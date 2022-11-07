import styled from "styled-components";
import { themeColors } from "../../../../Common/Constants/themeColors";
import { theme } from "../../../../Common/Constants/theme";

export const RegisterStyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 20px;

  width: 648px;

  background: ${themeColors.gray1};
  border-radius: 2px;
  @media (max-width: ${theme.mobile}) {
    padding: 0 16px;
  }
`;

export const FormHeader = styled.p``;
