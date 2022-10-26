import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React from "react";
import { Input } from "../../Common/Components/Input/Input";
import { useForm } from "react-hook-form";
import { FlexDiv } from "../../Common/Components/flexDiv";
import { Checkbox } from "../../Common/Components/Checkbox";
import { theme } from "../../Common/Constants/theme";
import { ButtonStyled } from "../../Common/Components/buttonStyled";
import { LoginDto } from "../../Dto/userDto";
import { useAppDispatch } from "../../Config/Redux/core";
import { userActions } from "../../Config/Redux/userSlice";
import {
  FormElement,
  FormLabelStyled,
} from "../../Common/Components/formStyledElements";

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
  const submitClick = (data: LoginDto) => {
    dispatch(userActions.loginUser(data));
  };

  return (
    <LoginStyledForm onSubmit={handleSubmit(submitClick)}>
      <LoginFormName>Войти в Staff Pro</LoginFormName>
      <FormElement>
        <FormLabelStyled>Эл. адрес</FormLabelStyled>
        <Input
          {...register("login", {
            required: "Login is required",
            maxLength: {
              value: 80,
              message: "Maximum length is 80",
            },
          })}
          error={errors.login?.message}
        />
      </FormElement>
      <FormElement>
        <FormLabelStyled>Пароль</FormLabelStyled>
        <Input />
      </FormElement>
      <FlexDiv style={{ width: "100%" }}>
        <Checkbox label="Запомнить меня" initialValue={false} />
        <div style={{ marginLeft: "auto" }}>
          <StyledLink href="/unauth/recover-pass">Забыли пароль?</StyledLink>
        </div>
      </FlexDiv>
      <ButtonStyled type="submit" style={{ width: "76px" }}>
        Войти
      </ButtonStyled>
    </LoginStyledForm>
  );
};
