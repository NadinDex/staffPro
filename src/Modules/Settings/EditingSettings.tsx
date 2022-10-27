import React, { useMemo } from "react";
import styled from "styled-components";
import { UserDto, EditUserDto } from "../../Dto/userDto";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../Config/Redux/core";
import { userActions } from "../../Config/Redux/userSlice";
import { ErrorInputLabel } from "../../Common/Components/ErrorInputLabel";
import {
  FormElement,
  RowOfTwo,
  FormLabelStyled,
  FormGroupGap2,
  FormGroupSeparator,
  RowOfElements,
} from "../../Common/Components/formStyledElements";
import { Input } from "../../Common/Components/Input/Input";
import {
  emailReg,
  phoneReg,
  passwordLength,
} from "../../Common/Constants/regex";
import { themeColors } from "../../themeColors";
import { theme } from "../../Common/Constants/theme";
import { SelectComponent } from "../Auth/Select";
import {
  monthOptions,
  getYearsList,
} from "../../Common/Constants/selectOptions";
import { Password } from "../../Common/Components/Input/Password";
import { SettingsButton } from "./SettingsButton";

const SettingEdittingForm = styled.form`
  width: 100%;
  background: ${themeColors.gray1};
  border-radius: 2px;
`;
const SettingFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  padding: 24px;

  width: 648px;
  @media (max-width: ${theme.mobile}) {
    padding: 0 16px;
    width: 100%;
  }
`;

const SettingImageContainer = styled.div`
  height: 95px;
`;
const SettingsFormLabel = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: ${themeColors.gray7};
`;

const NewPasswordDiv = styled.div`
  @media (max-width: ${theme.mobile}) {
    padding-bottom: 24px;
  }
  padding: 0;
`;

export const EdittingSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    getValues,
  } = useForm<EditUserDto>();

  const dispatch = useAppDispatch();
  const submitClick = (data: EditUserDto) => {
    console.log(data);
    //validation??
    dispatch(userActions.updateUser(data));
  };

  const todayYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    return getYearsList(todayYear);
  }, [todayYear]);

  return (
    <SettingEdittingForm
      onSubmit={handleSubmit((e) => submitClick(e as EditUserDto))}
    >
      <SettingFormContainer>
        <FormGroupGap2>
          <FormLabelStyled>Изображение</FormLabelStyled>
          <SettingImageContainer></SettingImageContainer>
        </FormGroupGap2>
        <FormGroupGap2>
          <FormLabelStyled>E-mail</FormLabelStyled>
          <FormElement>
            <Input
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
        </FormGroupGap2>
        <FormGroupGap2>
          <FormLabelStyled>Телефон</FormLabelStyled>
          <FormElement>
            <Input
              placeholder="Телефон"
              {...register("phone", {
                pattern: {
                  value: phoneReg,
                  message: "Такого номера не существует",
                },
              })}
              error={errors.phone?.message}
            />
            <ErrorInputLabel text={errors.phone?.message} />
          </FormElement>
        </FormGroupGap2>
        <FormGroupSeparator />
        <FormGroupGap2>
          <FormLabelStyled>Фамилия</FormLabelStyled>
          <FormElement>
            <Input
              placeholder="Фамилия"
              {...register("lastName", {
                required: "Обязательное поле",
              })}
              error={errors.lastName?.message}
            />
            <ErrorInputLabel text={errors.lastName?.message} />
          </FormElement>
        </FormGroupGap2>

        <RowOfTwo>
          <FormGroupGap2>
            <FormLabelStyled>Имя</FormLabelStyled>
            <FormElement>
              <Input
                placeholder="Имя"
                {...register("firstName", {
                  required: "Обязательное поле",
                })}
                error={errors.firstName?.message}
              />
              <ErrorInputLabel text={errors.firstName?.message} />
            </FormElement>
          </FormGroupGap2>

          <FormGroupGap2>
            <FormLabelStyled>Отчество</FormLabelStyled>
            <FormElement>
              <Input
                placeholder="Отчество"
                {...register("fatherName", {
                  required: "Обязательное поле",
                })}
                error={errors.fatherName?.message}
              />
              <ErrorInputLabel text={errors.fatherName?.message} />
            </FormElement>
          </FormGroupGap2>
        </RowOfTwo>
        <FormGroupSeparator />
        <FormGroupGap2>
          <FormLabelStyled>Дата рождения</FormLabelStyled>
          <RowOfElements>
            <FormElement>
              <Input
                type="number"
                placeholder="День"
                {...register("bDate", {
                  required: "Обязательное поле",
                  min: { value: 1, message: "Минимум 1" },
                  max: { value: 31, message: "Максисмум 31" },
                })}
                error={errors.bDate?.message}
              />
              <ErrorInputLabel text={errors.bDate?.message} />
            </FormElement>
            <FormElement>
              <Controller
                control={control}
                name="bMonth"
                rules={{
                  required: "Обязательное поле",
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <SelectComponent
                    placeholder="Месяц"
                    options={monthOptions}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    name={name}
                    error={errors.bMonth?.message}
                  />
                )}
              />
              <ErrorInputLabel text={errors.bMonth?.message} />
            </FormElement>
            <FormElement>
              <Controller
                control={control}
                name="bYear"
                rules={{
                  required: "Обязательное поле",
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <SelectComponent
                    placeholder="Год"
                    options={yearOptions}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    name={name}
                    error={errors.bYear?.message}
                  />
                )}
              />
              <ErrorInputLabel text={errors.bYear?.message} />
            </FormElement>
          </RowOfElements>
        </FormGroupGap2>
        <FormGroupSeparator />
        <NewPasswordDiv>
          <RowOfTwo>
            <FormGroupGap2>
              <FormLabelStyled>Новый пароль</FormLabelStyled>
              <FormElement>
                <Password
                  placeholder="Новый пароль"
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
              </FormElement>
            </FormGroupGap2>
          </RowOfTwo>{" "}
          <SettingsFormLabel>
            Длина пароля должна составлять 8-20 символов, содержать цифры, буквы
            латинского алфавита в нижнем и верхнем регистре
          </SettingsFormLabel>
        </NewPasswordDiv>
      </SettingFormContainer>
      <SettingsButton />
    </SettingEdittingForm>
  );
};
