import {
  ButtonStyled,
  AccountButtonCancelStyled,
  AccountButtonStyled,
} from "../../Common/Components/buttonStyled";
import styled from "styled-components";
import React from "react";
import { themeColors } from "../../themeColors";

const SettingsButtonContainer = styled.div`
  margin-top: aoto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 20px 16px;
  gap: 10px;
  width: 100%;
  height: 72px;

  background: ${themeColors.gray1};
  box-shadow: inset 0px 1px 0px ${themeColors.gray5};
`;
interface AccountAddButtonsProps {
  onClose: () => void;
  onSubmit: () => void;
}
export const AccountAddButtons = (props: AccountAddButtonsProps) => {
  return (
    <SettingsButtonContainer>
      <AccountButtonCancelStyled type="reset" onClick={() => props.onClose()}>
        Отменить
      </AccountButtonCancelStyled>
      <AccountButtonStyled type="submit">Добавить</AccountButtonStyled>
    </SettingsButtonContainer>
  );
};
