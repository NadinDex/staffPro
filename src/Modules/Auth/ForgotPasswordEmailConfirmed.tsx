import React from "react";
import { ButtonStyled } from "../../Common/Components/buttonStyled";
import { FullScreanDiv, FormHeaderText, LogoText } from "./authStyledElements";
import { ForgotPasswordForm, FormText } from "./forgotPasswordStyled";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordEmailConfirmed = () => {
  const navigate = useNavigate();

  return (
    <FullScreanDiv>
      <LogoText>StaffPro</LogoText>
      <ForgotPasswordForm>
        <FormHeaderText>Восстановление доступа к аккаунту</FormHeaderText>
        <FormText>
          На электронный адрес user@mail.com отправлено письмо. Перейдите по
          ссылке в письме для создания нового пароля.
        </FormText>
        <ButtonStyled
          type="submit"
          style={{ width: "100%" }}
          onClick={() => navigate("/")}
        >
          На главную
        </ButtonStyled>
      </ForgotPasswordForm>
    </FullScreanDiv>
  );
};
