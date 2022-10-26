export const months1 = {
  Январь: 1,
  Февраль: 2,
  Март: 3,
  Апрель: 4,
  Май: 5,
  Июнь: 6,
  Июль: 7,
  Август: 8,
  Сентябрь: 9,
  Октябрь: 10,
  Ноябрь: 11,
  Декабрь: 12,
};

export interface OptionTypeValueNumber {
  label: string;
  value: number | string;
}

export const getYearsList = (todayYear: number) => {
  const years = Array.from(new Array(80), (val, index) => todayYear - index);
  return years.map((value) => {
    return {
      label: value.toString(),
      value: value,
    } as OptionTypeValueNumber;
  });
};

export const monthOptions = [
  {
    label: "Январь",
    value: 1,
  },
  {
    label: "Февраль",
    value: 2,
  },
  {
    label: "Март",
    value: 3,
  },
  {
    label: "Апрель",
    value: 4,
  },
  {
    label: "Май",
    value: 5,
  },
  {
    label: "Июнь",
    value: 6,
  },
  {
    label: "Июль",
    value: 7,
  },
  {
    label: "Август",
    value: 8,
  },
  {
    label: "Сентябрь",
    value: 9,
  },
  {
    label: "Октябрь",
    value: 10,
  },
  {
    label: "Ноябрь",
    value: 11,
  },
  {
    label: "Декабрь",
    value: 12,
  },
];
export const sexOptions = [
  {
    label: "Мужчина",
    value: "male",
  },
  {
    label: "Женщина",
    value: "female",
  },
];
