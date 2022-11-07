import { Switch, List, Avatar, Divider } from "antd";
import styled from "styled-components";
import React from "react";
import googleLogo from "../../../Asserts/Images/Google.png";
import slackLogo from "../../../Asserts/Images/slack.webp";
import dropboxLogo from "../../../Asserts/Images/dropbox.png";
import { theme } from "../../../Common/Constants/theme";

const SettingsAccountsMainDiv = styled.div`
  padding: 24px;
  @media (max-width: ${theme.mobile}) {
    padding: 24px 16px;
  }
`;
const ItemDiv = styled.div``;
const ItemLogo = styled.img``;
const ItemText = styled.div``;

const data = [
  {
    title: "Google",
    text: "Правильно планируйте свой рабочий процесс",
    img: googleLogo,
  },
  {
    title: "Slack",
    text: "Интегрируйте обсуждения проектов",
    img: slackLogo,
  },
  {
    title: "Dropbox",
    text: "Интегрируйте управление проектами",
    img: dropboxLogo,
  },
];

export const SettingsAccounts = () => {
  const onGoogleChange = () => {};
  const onSlachChange = () => {};
  const onDropboxChange = () => {};
  return (
    <SettingsAccountsMainDiv>
      <Divider style={{ margin: 0 }} />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[<Switch size="small" onChange={onGoogleChange} />]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.img}
                  style={{ width: "40px", marginLeft: "10px", height: "100%" }}
                />
              }
              title={item.title}
              description={item.text}
            />
          </List.Item>
        )}
      />
      <Divider style={{ margin: 0 }} />
    </SettingsAccountsMainDiv>
  );
};
