import React, { useEffect } from "react";
import { ButtonStyled } from "../../Common/Components/buttonStyled";
import {
  FullScreanDiv,
  FormHeaderText,
  LogoText,
  RegisterLinkContainer,
} from "./authStyledElements";
import { ChangePasswordDto } from "../../Dto/userDto";
import { useAppDispatch } from "../../Config/Redux/core";
import { useParams } from "react-router-dom";
import { ForgotPasswordForm, FormText } from "./forgotPasswordStyled";
import { Password } from "../../Common/Components/Input/Password";
import { passwordLength } from "../../Common/Constants/regex";
import { ErrorInputLabel } from "../../Common/Components/ErrorInputLabel";
import { userActions } from "../../Config/Redux/userSlice";
import { openNotification } from "../../App";
import { useForm } from "react-hook-form";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<ChangePasswordDto>();

  const { email } = useParams<{ email?: string }>();
  useEffect(() => {
    if (email) setValue("email", email);
  }, []);

  const dispatch = useAppDispatch();
  const onSubmit = (data: ChangePasswordDto) => {
    if (!data.email) {
      openNotification({
        message: "Неправильная ссылка: не указан email",
        customClass: "Notification__error",
        icon: null,
      });
    } else dispatch(userActions.chengePassword(data));
  };

  return (
    <FullScreanDiv>
      <LogoText>StaffPro</LogoText>
      <ForgotPasswordForm onSubmit={handleSubmit(onSubmit)}>
        <FormHeaderText>Введите новый пароль</FormHeaderText>
        <FormText>
          Введите ваш эл. адрес, чтобы восстановить доступ к своему аккаунту
        </FormText>
        <input type="hidden" id="email" value="" {...register("email")} />
        <Password
          placeholder="Пароль"
          {...register("password", {
            required: "Обязательное поле",
            pattern: {
              value: passwordLength,
              message: "Пароль должен содержать от 8 до 64 символов",
            },
          })}
          error={errors.password?.message}
        />
        <ErrorInputLabel text={errors.password?.message} />
        <Password
          placeholder="Повторите пароль"
          {...register("passwordRepeat", {
            required: "Обязательное поле",
            validate: {
              positive: (value) =>
                value === getValues().password || "Пароли не совпадают",
            },
          })}
          error={errors.passwordRepeat?.message}
        />
        <ErrorInputLabel text={errors.passwordRepeat?.message} />

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
