import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import { UserDto } from "../../Dto/userDto";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Config/Redux/core";
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
import { emailReg, phoneReg } from "../../Common/Constants/regex";
import { themeColors } from "../../themeColors";
import { theme } from "../../Common/Constants/theme";
import { SelectComponent } from "../../Common/Components/Select";
import {
  monthOptions,
  getYearsList,
} from "../../Common/Constants/selectOptions";
import { SettingsButton } from "./SettingsButton";
import { AvatarUpload } from "./AvaratUpload";
import { SettingNewPassword } from "./SettingNewPassword";
import { openNotification } from "../../App";

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
  padding: 24px 24px 24px 24px;

  width: 648px;
  @media (max-width: ${theme.mobile}) {
    padding: 0 16px;
    width: 100%;
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 24px 0 24px;
`;

const SettingImageContainer = styled.div`
  height: 85px;
`;

export const EdittingSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<UserDto>();

  const currentUser = useAppSelector((store) => store.user.currentUser);
  useEffect(() => {
    reset(currentUser);
  }, []);

  const dispatch = useAppDispatch();
  const submitClick = (data: UserDto) => {
    console.log(data);
    dispatch(userActions.updateUser(data));
  };

  const error = useAppSelector((store) => store.user.error);
  useEffect(() => {
    if (error)
      openNotification({
        message: error,
        customClass: "Notification__error",
        icon: null,
      });
    dispatch(userActions.clearError());
  }, [error]);

  const todayYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    return getYearsList(todayYear);
  }, [todayYear]);

  const onAvatarChanged = (value: string) => {
    setValue("avatar", value);
    console.log("File URL => ", value);
  };
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <>
      <AvatarContainer>
        <FormGroupGap2>
          <FormLabelStyled>Изображение</FormLabelStyled>
          <SettingImageContainer>
            <AvatarUpload
              url={currentUser?.avatar}
              onAfterUpload={onAvatarChanged}
            />
          </SettingImageContainer>
        </FormGroupGap2>
      </AvatarContainer>
      <SettingEdittingForm ref={formRef} onSubmit={handleSubmit(submitClick)}>
        <input type="hidden" {...register("avatar")} />
        <SettingFormContainer>
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
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <SelectComponent
                      placeholder="Месяц"
                      options={monthOptions}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={monthOptions.find((x) => x.value === value)?.value}
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
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <SelectComponent
                      placeholder="Год"
                      options={yearOptions}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={
                        yearOptions
                          ? yearOptions.find((x) => x.value === value)?.value
                          : undefined
                      }
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
        </SettingFormContainer>

        <SettingNewPassword />

        <SettingsButton />
      </SettingEdittingForm>
    </>
  );
};
