import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React, { HTMLAttributes, useEffect } from "react";
import {
  FormGroupGap2,
  FormLabelStyled,
  FormGroupSeparator,
} from "../../Common/Components/formStyledElements";
import { Input } from "../../Common/Components/Input/Input";
import { AccountDto } from "../../Dto/accountDto";
import { useForm, Controller } from "react-hook-form";
import { ErrorInputLabel } from "../../Common/Components/ErrorInputLabel";
import { DatePicker } from "antd";
import { SelectComponent } from "../../Common/Components/Select";
import { AccountStatus } from "../../Common/Constants/accountStatus";
import { AccountAddButtons } from "./AccountAddButtons";
import { useAppDispatch } from "../../Config/Redux/core";
import { accountActions } from "./accountSlice";
import { theme } from "../../Common/Constants/theme";
import moment from "moment";

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  gap: 10px;

  position: absolute;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: ${themeColors.gray1};

  width: 400px;
  float: right;

  @media (max-width: ${theme.mobile}) {
    width: 100%;
    float: none;
  }
`;
const AccountFormContainer = styled.div`
  padding: 16px;
  width: 100%;
  height: 100%;
`;

const AccountFormHeader = styled.div`
  box-shadow: inset 0px -1px 0px ${themeColors.gray5};
  padding: 16px;
  width: 100%;
  label {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${themeColors.gray9};
  }
`;
interface ModalContainerPropsType extends HTMLAttributes<HTMLHeadingElement> {
  show: boolean;
}
export const ModalContainer = styled.div<ModalContainerPropsType>`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  //z-index: 8888;
  background: rgba(0, 0, 0, 0.3);

  left: ${(props: ModalContainerPropsType) => (props.show ? "0" : "100vw")};
`;
export const ModalContent = styled.div`
  left: ${(props: ModalContainerPropsType) => (props.show ? "0" : "100vw")};
`;

interface AccountEditPropsType extends HTMLAttributes<HTMLHeadingElement> {
  account?: AccountDto;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
export const AccountEdit = (props: AccountEditPropsType) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<AccountDto>();

  const dispatch = useAppDispatch();
  const submitClick = (data: AccountDto) => {
    dispatch(accountActions.addAccount(data));
    props.onSubmit();
  };

  useEffect(() => {
    if (props.account) {
      reset({
        id: props.account?.id,
        date: props.account.date,
        deposit: props.account.deposit,
        paid: props.account.paid,
        state: props.account.state,
      });
    } else {
      reset({});
    }
  }, [props.account]);

  return (
    <AccountForm onSubmit={handleSubmit((e) => submitClick(e as AccountDto))}>
      <AccountFormHeader>
        <label>
          {props.account ? "Редактирование счета" : "Добавление счета"}
        </label>
      </AccountFormHeader>
      <AccountFormContainer>
        <FormGroupSeparator />
        <FormGroupGap2>
          <FormLabelStyled>Номер</FormLabelStyled>
          <Input
            placeholder="Номер"
            {...register("id", {
              required: "Обязательное поле",
            })}
            error={errors.id?.message}
          />
          <ErrorInputLabel text={errors.id?.message} />
        </FormGroupGap2>
        <FormGroupGap2>
          <FormLabelStyled>Дата</FormLabelStyled>
          <Controller
            control={control}
            name="date"
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                onChange={(date) => onChange(date)}
                placeholder="Дата"
                value={moment(value)}
                onBlur={onBlur}
              />
            )}
          />
          <ErrorInputLabel text={errors.id?.message} />
        </FormGroupGap2>
        <FormGroupGap2>
          <FormLabelStyled>Взнос</FormLabelStyled>
          <Input
            placeholder="Взнос"
            {...register("deposit", {
              required: "Обязательное поле",
            })}
            error={errors.deposit?.message}
          />
          <ErrorInputLabel text={errors.id?.message} />
        </FormGroupGap2>
        <FormGroupGap2>
          <FormLabelStyled>Оплачено</FormLabelStyled>
          <Input
            placeholder="Оплачено"
            {...register("paid", {
              required: "Обязательное поле",
              min: {
                value: 0,
                message: "Не может быть отрицательным числом",
              },
            })}
            error={errors.paid?.message}
          />
          <ErrorInputLabel text={errors.id?.message} />
        </FormGroupGap2>
        <FormGroupGap2>
          <FormLabelStyled>Статус</FormLabelStyled>
          <Controller
            control={control}
            name="state"
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <SelectComponent
                placeholder="Статус"
                options={AccountStatus}
                onChange={onChange}
                onBlur={onBlur}
                value={AccountStatus.find((x) => x.label === value)?.value}
                ref={ref}
                name={name}
                error={errors.state?.message}
              />
            )}
          />
          <ErrorInputLabel text={errors.state?.message} />
          <ErrorInputLabel text={errors.id?.message} />
        </FormGroupGap2>
      </AccountFormContainer>
      <AccountAddButtons
        onClose={props.onClose}
        onSubmit={props.onSubmit}
        updateButton={props.account ? true : false}
      />
    </AccountForm>
  );
};
