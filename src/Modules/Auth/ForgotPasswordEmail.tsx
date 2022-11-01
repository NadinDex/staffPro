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
import { Navigate, useNavigate } from "react-router-dom";
import { ForgotPasswordForm, FormText } from "./forgotPasswordStyled";
import { useForm } from "react-hook-form";
import { ErrorInputLabel } from "../../Common/Components/ErrorInputLabel";
import { FormElement } from "../../Common/Components/formStyledElements";

const baseUrl = "https://localhost:3000/unauth/recover-pass-email-confirmed";
const sendEmail = (to: string) => {
  const mailjet = require("node-mailjet").connect(
    "df3346523d36aefaeca9170e663890da",
    "c408827d3218e2c50f4a35a804f9935c"
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "548107@gmail.com",
          Name: "StaffPro",
        },
        To: [
          {
            Email: to,
          },
        ],
        Subject: "Password recovery link from StaffPro.",
        TextPart: "Password recovery link from StaffPro.",
        HTMLPart:
          "<h3>Dearest friend, this link will redirect you to change password form: <a href='" +
          baseUrl +
          "?email=" +
          to +
          "'>change password</a>!</h3><br />",
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .then((result: any) => {
      return result.body;
    })
    .catch((err: any) => {
      console.log(err.statusCode);
    });
};

export const ForgotPasswordEmail = () => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordEmailDto>();
  const navigate = useNavigate();
  const users = useAppSelector((store: AppStateType) => store.user.users);
  const onSubmit = (data: ChangePasswordEmailDto) => {
    if (users.find((x) => x.email == data.email)) {
      //sendEmail(data.email);
      navigate("/unauth/recover-pass-email-confirmed");
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
        <FormElement>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: emailReg,
                message: "invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <ErrorInputLabel text={errors.email?.message} />
        </FormElement>
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
