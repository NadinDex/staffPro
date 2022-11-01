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
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ForgotPasswordForm, FormText } from "./forgotPasswordStyled";
import { Password } from "../../Common/Components/Input/Password";
import { passwordLength } from "../../Common/Constants/regex";
import { ErrorInputLabel } from "../../Common/Components/ErrorInputLabel";
import { userActions } from "../../Config/Redux/userSlice";
import { openNotification } from "../../App";
import { useForm } from "react-hook-form";
import { FormElement } from "../../Common/Components/formStyledElements";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ChangePasswordDto>();

  const { email } = useParams<{ email?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: ChangePasswordDto) => {
    if (!data.email) {
      openNotification({
        message: "Неправильная ссылка: не указан email",
        customClass: "Notification__error",
        icon: null,
      });
    } else {
      dispatch(userActions.chengePassword(data));
      navigate("/");
    }
  };

  return (
    <FullScreanDiv>
      <LogoText>StaffPro</LogoText>
      <ForgotPasswordForm onSubmit={handleSubmit(onSubmit)}>
        <FormHeaderText>Введите новый пароль</FormHeaderText>
        <input type="hidden" id="email" value={email} {...register("email")} />
        <FormElement>
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
          {errors.password?.message && (
            <ErrorInputLabel text={errors.password?.message} />
          )}
        </FormElement>
        <FormElement>
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
          {errors.passwordRepeat?.message && (
            <ErrorInputLabel text={errors.passwordRepeat?.message} />
          )}
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
