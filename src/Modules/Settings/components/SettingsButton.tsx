import { ButtonStyled32 } from "../../../Common/Components/buttonStyled";
import styled from "styled-components";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { themeColors } from "../../../Common/Constants/themeColors";

const SettingsButtonContainer = styled.div`
  margin-top: aoto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px 16px;
  gap: 10px;
  width: 100%;

  height: 72px;
  background: ${themeColors.gray1};
  box-shadow: inset 0px 1px 0px ${themeColors.gray5};
`;

export const SettingsButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <SettingsButtonContainer>
      <ButtonStyled32 type="submit" {...props}>
        Сохранить изменения
      </ButtonStyled32>
    </SettingsButtonContainer>
  );
};
