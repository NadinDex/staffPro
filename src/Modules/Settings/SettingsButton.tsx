import { ButtonStyled } from "../../Common/Components/buttonStyled";
import styled from "styled-components";
import React from "react";
import { themeColors } from "../../themeColors";

const SettingsButtonContainer = styled.div`
  margin-top: aoto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px 16px;
  gap: 10px;
  width: 100%;

  //position: absolute;
  height: 72px;
  //left: 224px;
  //right: 24px;
  //bottom: 24px;
  background: ${themeColors.gray1};
  box-shadow: inset 0px 1px 0px ${themeColors.gray5};
`;

export const SettingsButton = () => {
  return (
    <SettingsButtonContainer>
      <ButtonStyled type="submit">Сохранить изменения</ButtonStyled>
    </SettingsButtonContainer>
  );
};
