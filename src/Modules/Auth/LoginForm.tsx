import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React, { useEffect } from "react";
import { Input } from "../../Common/Components/Input/Input";
import { useForm } from "react-hook-form";
import { FlexDiv } from "../../Common/Components/flexDiv";
import { Checkbox } from "../../Common/Components/Checkbox";
import { theme } from "../../Common/Constants/theme";
import { ButtonStyled } from "../../Common/Components/buttonStyled";
import { LoginDto } from "../../Dto/userDto";
import { useAppDispatch, useAppSelector } from "../../Config/Redux/core";
import { userActions } from "../../Config/Redux/userSlice";
import {
  FormElement,
  FormLabelStyled,
} from "../../Common/Components/formStyledElements";
import { Password } from "../../Common/Components/Input/Password";

import { message } from "antd";
import { openNotification } from "../../App";

const LoginStyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  width: 416px;
  background: ${themeColors.gray1};
  border-radius: 2px;

  @media (max-width: ${theme.mobile}) {
    width: calc(100% - 32px);
    padding: 24px 16px 32px 16px;
  }
`;

const LoginFormName = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: ${themeColors.gray9};

  @media (max-width: ${theme.mobile}) {
    width: 100%;
    text-align: center;
  }
`;

const StyledLink = styled.a`
  margin-left: auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  color: ${themeColors.blue6};
`;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const dispatch = useAppDispatch();
  const dispatchError = useAppSelector((store) => store.user.error);
  const submitClick = (data: LoginDto) => {
    dispatch(userActions.clearError());
    dispatch(userActions.loginUser(data));
    //dispatch(userActions.crearUsers());
  };

  useEffect(() => {
    if (dispatchError)
      openNotification({
        message: dispatchError,
        customClass: "Notification__error",
        icon: null,
      });
    dispatch(userActions.clearError());
  }, [dispatchError]);

  return (
    <LoginStyledForm onSubmit={handleSubmit(submitClick)}>
      <LoginFormName>Войти в Staff Pro</LoginFormName>
      <FormElement>
        <FormLabelStyled>Эл. адрес</FormLabelStyled>
        <Input
          {...register("email", {
            required: "Login is required",
            maxLength: {
              value: 80,
              message: "Maximum length is 80",
            },
          })}
          error={errors.email?.message}
        />
      </FormElement>
      <FormElement>
        <FormLabelStyled>Пароль</FormLabelStyled>
        <Password
          {...register("password", {
            required: "Password is required",
            maxLength: {
              value: 80,
              message: "Maximum length is 80",
            },
          })}
          error={errors.password?.message}
        />
      </FormElement>
      <FlexDiv style={{ width: "100%" }}>
        <Checkbox label="Запомнить меня" />
        <div style={{ marginLeft: "auto" }}>
          <StyledLink href="/unauth/recover-pass-email">
            Забыли пароль?
          </StyledLink>
        </div>
      </FlexDiv>
      <ButtonStyled type="submit" style={{ width: "76px" }}>
        Войти
      </ButtonStyled>
    </LoginStyledForm>
  );
};
