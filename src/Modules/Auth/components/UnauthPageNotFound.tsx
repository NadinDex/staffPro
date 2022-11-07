import React from "react";
import { FullScreanDiv, LogoText } from "./authStyledElements";
import { themeColors } from "../../../Common/Constants/themeColors";
import styled from "styled-components";

const PageNotFoundTexContainet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  width: 282px;
  height: 318px;

  background: ${themeColors.gray1};
  border-radius: 2px;
`;

export const UnauthPageNotFound = () => {
  return (
    <FullScreanDiv gap="16px">
      <LogoText>StaffPro</LogoText>
      <PageNotFoundTexContainet>
        <p>Такой страницы не найдено</p>
      </PageNotFoundTexContainet>
    </FullScreanDiv>
  );
};
