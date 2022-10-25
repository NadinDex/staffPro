import styled from "styled-components";
import React from "react";
import { themeColors } from "../../themeColors";
import { Input } from "../../Common/Components/Input/Input";
import { ButtonStyled } from "../../Common/Components/buttonStyled";
import { theme } from "../../Common/Constants/theme";
import {
  FullScreanDiv,
  FormHeaderText,
  LogoText,
  RegisterLinkContainer,
} from "./authStyledElements";

const ForgotPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  width: 282px;
  height: 318px;

  background: ${themeColors.gray1};
  border-radius: 2px;

  @media (max-width: ${theme.mobile}) {
    width: calc(100% - 32px);
    padding: 24px 16px 32px 16px;
  }
`;

const FormText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray8};
  margin: 0;
`;

export const ForgotPassword = () => {
  return (
    <FullScreanDiv>
      <LogoText>StaffPro</LogoText>
      <ForgotPasswordForm>
        <FormHeaderText>Забыли пароль?</FormHeaderText>
        <FormText>
          Введите ваш эл. адрес, чтобы восстановить доступ к своему аккаунту
        </FormText>

        <Input type="email" style={{ width: "100%" }} placeholder="Email" />
        <ButtonStyled type="submit" style={{ width: "100%" }}>
          Подтвердить
        </ButtonStyled>
        <RegisterLinkContainer>
          <span>Впервые в StaffPro? &nbsp;</span>
          <a href="/unauth/register">Зарегистрироваться</a>
        </RegisterLinkContainer>
      </ForgotPasswordForm>
    </FullScreanDiv>
  );
};
