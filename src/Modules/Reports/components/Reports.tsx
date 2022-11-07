import React from "react";
import { HeaderTitleDiv, HeaderTitle } from "../../Layout/components/Header";
import { Tabs } from "antd";
import {
  TabContainer,
  PageBGSeparator,
  PageContainer,
} from "../../../Common/Components/pageStyles";
import { ReportsList } from "./ReportsList";

const tabItems = [
  {
    label: `Все отчеты`,
    key: 1,
    children: <ReportsList />,
  },
  {
    label: `Избранное`,
    key: 2,
    children: <ReportsList favorite={true} />,
  },
];

export const Reports = () => {
  return (
    <>
      <HeaderTitleDiv>
        <HeaderTitle>Отчеты</HeaderTitle>
      </HeaderTitleDiv>
      <TabContainer>
        <Tabs
          items={tabItems.map((x, i) => {
            const id = String(i);
            return {
              label: x.label,
              key: id,
              children: (
                <PageBGSeparator>
                  <PageContainer>{x.children}</PageContainer>
                </PageBGSeparator>
              ),
            };
          })}
        />
      </TabContainer>
    </>
  );
};
