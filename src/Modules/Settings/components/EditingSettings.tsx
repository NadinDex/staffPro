import React, { useEffect } from "react";
import styled from "styled-components";
import { UserDto } from "../../../Dto/userDto";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Config/Redux/core";
import { userActions } from "../../Auth/userSlice";
import { ErrorInputLabel } from "../../../Common/Components/ErrorInputLabel";
import {
  FormElement,
  RowOfTwo,
  FormLabelStyled,
  FormGroupGap2,
  FormGroupSeparator,
} from "../../../Common/Components/formStyledElements";
import { Input } from "../../../Common/Components/Input/Input";
import { emailReg, phoneReg } from "../../../Common/Constants/regex";
import { themeColors } from "../../../Common/Constants/themeColors";
import { theme } from "../../../Common/Constants/theme";
import { SettingsButton } from "./SettingsButton";
import { AvatarUpload } from "./AvaratUpload";
import { SettingNewPassword } from "./SettingNewPassword";
import { openAppNotification } from "../../../App";
import { BirthdayFormElements } from "../../../Common/Components/BirthdayFormElements";

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
    formState: { errors, isDirty },
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
    if (isDirty) {
      dispatch(userActions.updateUser(data));
      openAppNotification({
        message: "Данные оуспешно изменены",
        customClass: "Notification__info",
        type: "info",
      });
    }
  };

  const error = useAppSelector((store) => store.user.error);
  useEffect(() => {
    if (error)
      openAppNotification({
        message: error,
        customClass: "Notification__error",
        icon: null,
      });
    dispatch(userActions.clearError());
  }, [error]);

  const onAvatarChanged = (value: string) => {
    setValue("avatar", value);
    console.log("File URL => ", value);
  };

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
      <SettingEdittingForm onSubmit={handleSubmit(submitClick)}>
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
            <BirthdayFormElements formHooks={{ register, control, errors }} />
          </FormGroupGap2>
        </SettingFormContainer>

        <SettingNewPassword />

        <SettingsButton />
      </SettingEdittingForm>
    </>
  );
};
