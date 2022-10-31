import React from "react";
import { ButtonStyled } from "../../Common/Components/buttonStyled";
import { FullScreanDiv, FormHeaderText, LogoText } from "./authStyledElements";
import { ForgotPasswordForm, FormText } from "./forgotPasswordStyled";

export const ForgotPasswordEmailConfirmed = () => {
  return (
    <FullScreanDiv>
      <LogoText>StaffPro</LogoText>
      <ForgotPasswordForm>
        <FormHeaderText>Восстановление доступа к аккаунту</FormHeaderText>
        <FormText>
          На электронный адрес user@mail.com отправлено письмо. Перейдите по
          ссылке в письме для создания нового пароля.
        </FormText>
        <ButtonStyled type="submit" style={{ width: "100%" }}>
          На главную
        </ButtonStyled>
      </ForgotPasswordForm>
    </FullScreanDiv>
  );
};
