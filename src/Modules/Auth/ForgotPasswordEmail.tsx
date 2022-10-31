import React from "react";
import { Input } from "../../Common/Components/Input/Input";
import { ButtonStyled } from "../../Common/Components/buttonStyled";
import {
  FullScreanDiv,
  FormHeaderText,
  LogoText,
  RegisterLinkContainer,
} from "./authStyledElements";
import { ChangePasswordEmailDto } from "../../Dto/userDto";
import { emailReg } from "../../Common/Constants/regex";
import { useAppSelector } from "../../Config/Redux/core";
import { AppStateType } from "../../Config/Redux/configureStore";
import { Navigate } from "react-router-dom";
import { ForgotPasswordForm, FormText } from "./forgotPasswordStyled";
import { useForm } from "react-hook-form";

export const ForgotPasswordEmail = () => {
  const { setError, register, handleSubmit } = useForm<
    ChangePasswordEmailDto
  >();

  const users = useAppSelector((store: AppStateType) => store.user.users);
  const onSubmit = (data: ChangePasswordEmailDto) => {
    if (users.find((x) => x.email == data.email)) {
      return (
        <Navigate
          to={"/unauth/recover-pass-email-confirmed?email" + data.email}
        />
      );
    } else {
      setError("email", {
        type: "server",
        message: "Пользователь с указанным Email не найден",
      });
    }
  };

  return (
    <FullScreanDiv>
      <LogoText>StaffPro</LogoText>
      <ForgotPasswordForm onSubmit={handleSubmit(onSubmit)}>
        <FormHeaderText>Забыли пароль?</FormHeaderText>
        <FormText>
          Введите ваш эл. адрес, чтобы восстановить доступ к своему аккаунту
        </FormText>

        <Input
          id="email"
          type="email"
          style={{ width: "100%" }}
          placeholder="Email"
          {...register("email", {
            required: "Обязательное поле",
            pattern: {
              value: emailReg,
              message: "invalid email address",
            },
          })}
        />
        <ButtonStyled
          type="submit"
          style={{ width: "100%" }}
          onClick={() => console.log("pass recovery button clicked")}
        >
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
