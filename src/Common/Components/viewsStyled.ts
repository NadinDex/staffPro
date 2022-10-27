import styled from "styled-components";
import { theme } from "../Constants/theme";
import { themeColors } from "../../themeColors";

export const TableView = styled.div`
  height: fit-content;
  @media (max-width: ${theme.mobile}) {
    height: 0;
    overflow: hidden;
  }

  .ant-table-tbody > tr > td {
    border: none;
  }
`;
export const CardView = styled.div`
  height: 0;
  overflow: hidden;
  @media (max-width: ${theme.mobile}) {
    height: fit-content;
  }
  & > div:nth-child(even) {
    background: ${themeColors.gray1};
  }
  & > div:nth-child(odd) {
    background: ${themeColors.gray2};
  }
`;

export const CardContainer = styled.div`
  background: ${themeColors.gray2};
  padding: 16px;
  display: flex;
  gap: 16px;
`;
export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 0 120px;
`;

export const CardFieldName = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray9};
`;
export const CardField = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray8};
`;
