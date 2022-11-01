import React from "react";
import { reportCategories, reports } from "../../Common/Constants/reports";
import { ReportPanel } from "./ReportPanel";
import styled from "styled-components";
import { theme } from "../../Common/Constants/theme";
import { themeColors } from "../../themeColors";

const RoportCategoryContainer = styled.div`
  width: 100%;
`;

const RoportLayoutDiv = styled.div`
  padding: 24px;
  display: flex;
  gap: 30px;

  @media (max-width: ${theme.mobile}) {
    flex-direction: column;
  }
`;
const RoportColumnDiv = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  gap: 30px;
  @media (max-width: ${theme.mobile}) {
    width: 100%;
  }
`;
const ReportCategoryTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 15px;
  color: ${themeColors.gray10};
`;

interface ReportsListProps {
  favorite?: boolean;
}

export const ReportsList = (props: ReportsListProps) => {
  return (
    <RoportLayoutDiv>
      <RoportColumnDiv>
        {reportCategories
          .filter(
            (c) =>
              c.id < 6 &&
              reports.filter(
                (r) =>
                  r.categoryId == c.id &&
                  (props.favorite ? r.tags.includes("favorite") : true)
              ).length > 0
          )
          .map((cat) => (
            <RoportCategoryContainer key={cat.id}>
              <ReportCategoryTitle>{cat.name}</ReportCategoryTitle>
              {reports
                .filter(
                  (r) =>
                    r.categoryId == cat.id &&
                    (props.favorite ? r.tags.includes("favorite") : true)
                )
                .map((r) => (
                  <ReportPanel report={r} key={r.id} />
                ))}
            </RoportCategoryContainer>
          ))}
      </RoportColumnDiv>

      <RoportColumnDiv>
        {reportCategories
          .filter(
            (c) =>
              c.id > 5 &&
              reports.filter(
                (r) =>
                  r.categoryId == c.id &&
                  (props.favorite ? r.tags.includes("favorite") : true)
              ).length > 0
          )
          .map((cat) => (
            <RoportCategoryContainer key={cat.id}>
              <ReportCategoryTitle>{cat.name}</ReportCategoryTitle>
              {reports
                .filter(
                  (r) =>
                    r.categoryId == cat.id &&
                    (props.favorite ? r.tags.includes("favorite") : true)
                )
                .map((r) => (
                  <ReportPanel report={r} key={r.id} />
                ))}
            </RoportCategoryContainer>
          ))}
      </RoportColumnDiv>
    </RoportLayoutDiv>
  );
};
