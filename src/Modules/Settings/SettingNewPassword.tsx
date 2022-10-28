import styled from "styled-components";
import { theme } from "../../Common/Constants/theme";
import { themeColors } from "../../themeColors";
import React from "react";
import {
  FormGroupGap2,
  FormLabelStyled,
  FormElement,
  RowOfTwo,
} from "../../Common/Components/formStyledElements";
import { Password } from "../../Common/Components/Input/Password";
import { ChangePasswordDto } from "../../Dto/userDto";
import { useForm } from "react-hook-form";
import { ErrorInputLabel } from "../../Common/Components/ErrorInputLabel";
import { passwordLength } from "../../Common/Constants/regex";

const NewPasswordDiv = styled.div`
  @media (max-width: ${theme.mobile}) {
    padding-bottom: 24px;
  }
  padding: 0;
`;
const SettingsFormLabel = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: ${themeColors.gray7};
`;

const PasswordEdittingForm = styled.form`
  background: ${themeColors.gray1};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  padding: 4px 24px 18px 24px;

  width: 648px;
  @media (max-width: ${theme.mobile}) {
    padding: 0 16px;
    width: 100%;
  }
`;

export const SettingNewPassword = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    getValues,
    setValue,
    reset,
  } = useForm<ChangePasswordDto>();

  const onSubmit = (data: ChangePasswordDto) => {};

  const handleKeyUp = () => {};

  return (
    <PasswordEdittingForm ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <NewPasswordDiv>
        <RowOfTwo>
          <FormGroupGap2>
            <FormLabelStyled>Новый пароль</FormLabelStyled>
            <FormElement>
              <Password
                onKeyUp={handleKeyUp}
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
            </FormElement>
          </FormGroupGap2>
          <FormGroupGap2>
            <FormLabelStyled>Повторите пароль</FormLabelStyled>
            <FormElement>
              <Password
                onKeyUp={handleKeyUp}
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
            </FormElement>
          </FormGroupGap2>
        </RowOfTwo>
        <SettingsFormLabel>
          Длина пароля должна составлять 8-20 символов, содержать цифры, буквы
          латинского алфавита в нижнем и верхнем регистре
        </SettingsFormLabel>
      </NewPasswordDiv>
    </PasswordEdittingForm>
  );
};
