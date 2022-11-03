import styled from "styled-components";
import { theme } from "../Constants/theme";
import { themeColors } from "../../themeColors";

export const PageBGSeparator = styled.div`
  background: ${themeColors.BG};
  padding: 24px;
  //min-height: 100%;
  @media (max-width: ${theme.mobile}) {
    padding: 0;
    height: fit-content;
  }
`;
export const PageContainer = styled.div`
  background: ${themeColors.gray1};
  height: 100%;
`;
export const TabContainer = styled.div`
  height: 100%;
  background: ${themeColors.BG};
  .ant-tabs-nav {
    margin: 0;
    padding-left: 23px;
    background-color: ${themeColors.gray1};

    @media (max-width: ${theme.mobile}) {
      margin-left: 16px;
      padding-top: 8px;
    }
  }
  .ant-tabs-content-holder {
    height: 100%;
  }
  .ant-tabs-content {
    height: 100%;
  }
  .ant-tabs-content-holder {
    height: 100%;
  }
  .ant-tabs-tabpane {
    height: 100%;
  }
  .ant-tabs-nav::before {
    border-bottom: none;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;

  padding: 24px;
  @media (max-width: ${theme.mobile}) {
    padding: 12px;
    justify-content: center;
    background: #fff;
  }
`;
