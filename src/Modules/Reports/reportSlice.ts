import { ReportCategoryDto, ReportDto } from "../../Dto/reportsDto";
import { reportCategories, reports } from "../../Common/Constants/reports";
import { createSlice } from "@reduxjs/toolkit";

export interface ReportState {
  categories: ReportCategoryDto[];
  reports: ReportDto[];
  error?: string;
}

const initialReportState = {
  categories: reportCategories,
  reports: reports,
} as ReportState;

const reportsSlice = createSlice({
  name: "reports",
  initialState: initialReportState,
  reducers: {
    addReport: (state, action) => {
      state.reports.push(action.payload as ReportDto);
    },
    addReportTag: (state, action) => {
      const { id, tag } = action.payload;
      const report = state.reports.find((x) => x.id == id);
      if (report) {
        if (report.tags.includes(tag)) {
          state.error = "Указанный тэг уже присутствует";
          return;
        }
        const index = state.reports.indexOf(report);
        report.tags.push(tag);
        state.reports.splice(index, 1, report);
      } else {
        state.error = "Отчет не найден";
      }
    },
    removeReportTag: (state, action) => {
      const { id, tag } = action.payload;
      const report = state.reports.find((x) => x.id == id);
      if (report) {
        const index = state.reports.indexOf(report);
        const tagIndex = report.tags.indexOf(tag);
        if (tagIndex < 0) {
          state.error = "У отчета указанный тэг не найден";
          return;
        }
        report.tags.splice(tagIndex, 1);
        state.reports.splice(index, 1, report);
      } else {
        state.error = "Отчет не найден";
      }
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const reportsActions = { ...reportsSlice.actions };
export default reportsSlice.reducer;
