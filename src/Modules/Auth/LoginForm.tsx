import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React from "react";

const LoginStyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  max-width: 464px;
  max-height: 373px;
  background: ${themeColors.gray1};
  border-radius: 2px;
`;

const LoginFormName = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: ${themeColors.gray9};
`;

export const LoginForm = () => {
  return (
    <LoginStyledContainer>
      <LoginFormName>Войти в Staff Pro</LoginFormName>
      <form></form>
    </LoginStyledContainer>
  );
};
