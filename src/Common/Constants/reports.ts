import { ReportCategoryDto, ReportDto } from "../../Dto/reportsDto";

export const reportCategories: ReportCategoryDto[] = [
  { id: 1, name: "Финансы" },
  { id: 4, name: "Налог" },
  { id: 5, name: "Учет" },
  { id: 6, name: "Продажи" },
  { id: 7, name: "Покупки" },
  { id: 8, name: "Инвентарь" },
];

export const reports: ReportDto[] = [
  { id: 1, categoryId: 1, name: "Менеджер по бюджету", tags: ["favorite"] },
  { id: 2, categoryId: 1, name: "Балансовый отчет", tags: ["Новый"] },
  { id: 4, categoryId: 1, name: "Прибыль и убыток", tags: [] },
  {
    id: 5,
    categoryId: 1,
    name: "Отчет о движении денежных средств",
    tags: ["favorite", "Новый"],
  },
  {
    id: 6,
    categoryId: 1,
    name: "Сводная кассовая информация",
    tags: ["favorite", "Новый"],
  },
  { id: 7, categoryId: 1, name: "Отчет 1", tags: [] },
  { id: 8, categoryId: 1, name: "Отчет 2", tags: [] },
  { id: 9, categoryId: 1, name: "Отчет 3", tags: [] },

  { id: 10, categoryId: 4, name: "Менеджер по налогу", tags: [] },

  { id: 11, categoryId: 5, name: "Операции по счету", tags: ["favorite"] },
  {
    id: 12,
    categoryId: 5,
    name: "Банковский отчет",
    tags: ["Новый"],
  },
  { id: 13, categoryId: 5, name: "Операции с наличными", tags: [] },

  {
    id: 14,
    categoryId: 6,
    name: "Сведения о просроченной дебиторской задолженности",
    tags: ["favorite"],
  },
  {
    id: 15,
    categoryId: 6,
    name: "Отчет о счете-фактуре клиента",
    tags: ["favorite", "Новый"],
  },
  {
    id: 16,
    categoryId: 6,
    name: "Финансовая консультация клиента",
    tags: [],
  },

  {
    id: 17,
    categoryId: 7,
    name: "Сведения о просроченной дебиторской задолженности",
    tags: [],
  },
  {
    id: 18,
    categoryId: 7,
    name: "Отчет о счете-фактуре поставщика",
    tags: ["Новый"],
  },
  {
    id: 19,
    categoryId: 7,
    name: "Финансовая консультация поставщика",
    tags: [],
  },

  {
    id: 20,
    categoryId: 8,
    name: "Сводка по товарно-материальным запасам",
    tags: ["favorite"],
  },
  {
    id: 21,
    categoryId: 8,
    name: "Продажи по позициям",
    tags: ["favorite", "Новый"],
  },
];
