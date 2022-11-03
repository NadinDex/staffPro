import React, { useMemo } from "react";
import {
  RowOfElements,
  FormElement,
  FormLabelStyled,
} from "./formStyledElements";
import { ErrorInputLabel } from "./ErrorInputLabel";
import { SelectComponent } from "./Select";
import { Controller } from "react-hook-form";
import { monthOptions, getYearsList } from "../Constants/selectOptions";
import { Input } from "./Input/Input";

interface BirthdayFormElementsProps {
  formHooks: {
    register: any;
    control: any;
    errors: any;
  };
}
export const BirthdayFormElements = (props: BirthdayFormElementsProps) => {
  const { register, control, errors } = props.formHooks;

  const todayYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    return getYearsList(todayYear);
  }, [todayYear]);

  return (
    <>
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
    </>
  );
};
