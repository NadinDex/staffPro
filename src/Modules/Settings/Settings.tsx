import React from "react";
import { Tabs } from "antd";
import {
  TabContainer,
  PageBGSeparator,
  PageContainer,
} from "../../Common/Components/pageStyles";
import { EdittingSettings } from "./EditingSettings";
import { SettingsAccLink } from "./SettingsAccLink";
import { SettingsAccounts } from "./SettingAccounts";

export const Settings = () => {
  const tabItems = [
    {
      label: `Редактирование`,
      key: 1,
      children: <EdittingSettings />,
    },
    {
      label: `Привязанные аккаунты`,
      key: 2,
      children: <SettingsAccounts />,
    },
  ];
  return (
    <TabContainer>
      <Tabs
        style={{ height: "100%" }}
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
  );
};
