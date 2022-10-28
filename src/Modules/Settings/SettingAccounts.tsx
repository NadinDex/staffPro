import { Switch } from "antd";
import styled from "styled-components";
import React from "react";

const Line = styled.div``;
const ItemDiv = styled.div``;
const ItemLogo = styled.img``;
const ItemText = styled.div``;

export const SettingsAccounts = () => {
  const onGoogleChange = () => {};
  const onSlachChange = () => {};
  const onDropboxChange = () => {};
  return (
    <>
      <ItemDiv>
        <Line></Line>
        <ItemLogo src="" />
        <ItemText>
          <h1>Google</h1>
          <p>Правильно планируйте свой рабочий процесс</p>
        </ItemText>
        <Switch onChange={onGoogleChange} />;
      </ItemDiv>
      <ItemDiv>
        <Line></Line>
        <ItemLogo />
        <ItemText>
          <h1></h1>
          <p></p>
        </ItemText>
        <Switch defaultChecked onChange={onSlachChange} />;
      </ItemDiv>
      <ItemDiv>
        <Line></Line>
        <ItemLogo />
        <ItemText>
          <h1></h1>
          <p></p>
        </ItemText>
        <Switch defaultChecked onChange={onDropboxChange} />;
      </ItemDiv>
    </>
  );
};
