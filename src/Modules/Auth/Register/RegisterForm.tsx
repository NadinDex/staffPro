import React, { useMemo, useEffect } from "react";
import {
  FullScreanDiv,
  FormHeaderText,
  LogoText,
  RegisterLinkContainer,
} from "../authStyledElements";
import { Input } from "../../../Common/Components/Input/Input";
import { useForm, Controller } from "react-hook-form";
import { RegisterDto } from "../../../Dto/userDto";
import {
  emailReg,
  passwordLength,
  phoneReg,
} from "../../../Common/Constants/regex";
import { Password } from "../../../Common/Components/Input/Password";
import { selectCustomStyles } from "../../../Common/Components/selectCustomStyle";
import {
  monthOptions,
  OptionTypeValueNumber,
  sexOptions,
  getYearsList,
} from "../../../Common/Constants/selectOptions";
import { Checkbox } from "../../../Common/Components/Checkbox";
import { SelectComponent } from "../../../Common/Components/Select";
import { ButtonStyled } from "../../../Common/Components/buttonStyled";
import { useAppDispatch, useAppSelector } from "../../../Config/Redux/core";
import { userActions } from "../../../Config/Redux/userSlice";
import { ErrorInputLabel } from "../../../Common/Components/ErrorInputLabel";
import { RegisterStyledForm } from "./registerStyles";
import {
  FormElement,
  FormLabelStyled,
  FormGroupGap8,
  RowOfTwo,
  RowOfElements,
} from "../../../Common/Components/formStyledElements";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../../App";

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
  const submitClick = (data: RegisterDto) => {
    //validation??
    var presumedDate = new Date(data.bYear, data.bMonth, data.bDate);
    if (presumedDate.getDate() != data.bDate) {
      setError("bDate", {
        type: "server",
        message: "Такого числа нет в указанном месяце",
      });
    } else dispatch(userActions.registerUser(data));
  };
  const isRegistered = useAppSelector((store) => store.user.isRegistered);
  useEffect(() => {
    if (isRegistered && isDirty) navigate("/");
  }, [isRegistered]);

  const todayYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    return getYearsList(todayYear);
  }, [todayYear]);

  const dispatchError = useAppSelector((store) => store.user.error);
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
                    onChange={(e) => onChange(e.value)}
                    onBlur={onBlur}
                    value={
                      value ? monthOptions.find((o) => o.value === value) : null
                    }
                    ref={ref}
                    name={name}
                    width="225px"
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
                    onChange={(e) => onChange(e.value)}
                    onBlur={onBlur}
                    value={
                      value ? yearOptions.find((o) => o.value === value) : null
                    }
                    ref={ref}
                    name={name}
                    width="153px"
                    error={errors.bYear?.message}
                  />
                )}
              />
              <ErrorInputLabel text={errors.bYear?.message} />
            </FormElement>
          </RowOfElements>
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
