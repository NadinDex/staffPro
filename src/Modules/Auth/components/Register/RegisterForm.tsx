import React, { useEffect, useCallback } from "react";
import {
  FullScreanDiv,
  FormHeaderText,
  LogoText,
  RegisterLinkContainer,
} from "../authStyledElements";
import { Input } from "../../../../Common/Components/Input/Input";
import { useForm, Controller } from "react-hook-form";
import { RegisterDto, UserDto } from "../../../../Dto/userDto";
import {
  emailReg,
  passwordLength,
  phoneReg,
} from "../../../../Common/Constants/regex";
import { Password } from "../../../../Common/Components/Input/Password";
import { sexOptions } from "../../../../Common/Constants/selectOptions";
import { Checkbox } from "../../../../Common/Components/Checkbox";
import { SelectComponent } from "../../../../Common/Components/Select";
import { ButtonStyled } from "../../../../Common/Components/buttonStyled";
import { useAppDispatch, useAppSelector } from "../../../../Config/Redux/core";
import { userActions } from "../../userSlice";
import { ErrorInputLabel } from "../../../../Common/Components/ErrorInputLabel";
import { RegisterStyledForm } from "./registerStyles";
import {
  FormElement,
  FormGroupGap8,
  RowOfTwo,
  RowOfElements,
} from "../../../../Common/Components/formStyledElements";
import { useNavigate, useActionData } from "react-router-dom";
import { openAppNotification } from "../../../../App";
import { BirthdayFormElements } from "../../../../Common/Components/BirthdayFormElements";
import bcrypt from "bcryptjs";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    getValues,
    setError,
  } = useForm<RegisterDto>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((store) => store.user.users);
  const validForm = (data: RegisterDto) => {
    let valid = true;
    if (allUsers.find((x) => x.email == data.email)) {
      setError("email", {
        type: "server",
        message: "Пользователь с таким email уже зарегистрирован",
      });
      valid = false;
    }
    var presumedDate = new Date(data.bYear, data.bMonth, data.bDate);
    if (presumedDate.getDate() != data.bDate) {
      setError("bDate", {
        type: "server",
        message: "Такого числа нет в указанном месяце",
      });
      valid = false;
    }
    return valid;
  };
  const submitClick = (data: RegisterDto) => {
    if (validForm(data)) {
      let userDto = {
        id:
          allUsers && allUsers.length > 0
            ? Math.max(...allUsers.map((x) => x.id)) + 1
            : 1,
        passHash: bcrypt.hashSync(
          data.password,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        ),
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        fatherName: data.fatherName,
        bDate: data.bDate,
        bMonth: data.bMonth,
        bYear: data.bYear,
        phone: data.phone,
        sex: data.sex,
      } as UserDto;
      dispatch(userActions.registerUser(userDto));
    }
  };
  const isRegistered = useAppSelector((store) => store.user.operationSucceded);
  useEffect(() => {
    if (isRegistered && isDirty) navigate("/");
    dispatch(userActions.clearOperationState());
  }, [isRegistered]);

  const dispatchError = useAppSelector((store) => store.user.error);
  useEffect(() => {
    if (dispatchError)
      openAppNotification({
        message: dispatchError,
        customClass: "Notification__error",
        icon: null,
      });
    dispatch(userActions.clearError());
  }, [dispatchError]);

  return (
    <FullScreanDiv gap="16px">
      <LogoText>StaffPro</LogoText>
      <RegisterStyledForm
        onSubmit={handleSubmit((e) => submitClick(e as RegisterDto))}
      >
        <FormHeaderText>Зарегистрируйтесь</FormHeaderText>

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
        <RowOfTwo>
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
        </RowOfTwo>
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
          <ErrorInputLabel text={errors.password?.message} />
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
          <ErrorInputLabel text={errors.passwordRepeat?.message} />
        </FormElement>
        <FormGroupGap8>
          <BirthdayFormElements formHooks={{ register, control, errors }} />
        </FormGroupGap8>

        <RowOfElements>
          <FormElement style={{ width: "349px" }}>
            <Input
              type="tel"
              placeholder="Телефон (опционально)"
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
          <FormElement style={{ width: "225px" }}>
            <Controller
              control={control}
              name="sex"
              rules={{
                required: "Обязательное поле",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <SelectComponent
                  placeholder="Пол"
                  options={sexOptions}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  name={name}
                  error={errors.sex?.message}
                />
              )}
            />
            <ErrorInputLabel text={errors.sex?.message} />
          </FormElement>
        </RowOfElements>
        <FormElement>
          <Checkbox
            label="Я согласен с "
            {...register("userAgreement", {
              required: "Для регистрации необходимо принять условия соглашения",
            })}
          >
            <a href="#">пользовательским соглашением</a>
            <span> и </span>
            <a href="#">
              политикой обработки персональных данных пользователей
            </a>
          </Checkbox>
          {errors.userAgreement?.message && (
            <ErrorInputLabel text={errors.userAgreement?.message} />
          )}
        </FormElement>
        <ButtonStyled
          type="submit"
          style={{ width: "100%" }}
          onClick={() => console.log("clicked")}
        >
          Создать аккаунт
        </ButtonStyled>

        <RegisterLinkContainer>
          <span>Уже есть аккаунт в StaffPro? &nbsp;</span>
          <a href="/unauth/login">Войдите</a>
        </RegisterLinkContainer>
      </RegisterStyledForm>
    </FullScreanDiv>
  );
};
