import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React from "react";
import { FlexDiv } from "../../Common/Components/flexDiv";
import { LoginForm } from "./LoginForm";
import VectorSvg from "../../Asserts/Icons/Vector.svg";
import { theme } from "../../Common/Constants/theme";

const LeftSideDiv = styled.div`
  width: 34.3%;
  display: flex;
  flex-direction: column;
  background: ${themeColors.blue6};
  height: 100vh;

  @media (max-width: ${theme.mobile}) {
    width: 100%;
    height: inherit;
  }
`;
const Vector = styled.div`
  margin-top: auto;
  padding: 40px;
  display: flex;
  img {
    width: 100%;
  }
  @media (max-width: ${theme.mobile}) {
    height: 0px;
    padding: 0px;
    display: none;
  }
`;
const TextContainer = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  word-break: break-word;
  @media (max-width: ${theme.mobile}) {
    text-align: center;
  }
`;

const RightSideDiv = styled.div`
  width: 65.7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: ${theme.mobile}) {
    width: 100%;
    height: inherit;
  }
`;
const LogoText = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: ${themeColors.gray1};
`;
const SomeText = styled.p`
  font-weight: 600;
  font-size: 38px;
  line-height: 46px;
  color: ${themeColors.gray1};
  margin: 0;
`;

const RegisterLinkContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  margin: 20px 24px;

  background: ${themeColors.gray1};

  //border: 1px solid ${themeColors.gray5};
  @media (max-width: ${theme.mobile}) {
    position: relative;
  }
  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${themeColors.gray10};
  }
  a {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${themeColors.blue6};
  }
`;

export const LoginPage = () => {
  return (
    <FlexDiv>
      <LeftSideDiv>
        <TextContainer>
          <LogoText>Staff Pro</LogoText>
          <SomeText>Автоматизированные HR процессы</SomeText>
          <SomeText>Добро пожаловать!</SomeText>
        </TextContainer>
        <Vector>
          <img src={VectorSvg} />
        </Vector>
      </LeftSideDiv>
      <RightSideDiv>
        <LoginForm />
        <RegisterLinkContainer>
          <span>Нет аккаунта? &nbsp;</span>
          <a href="/unauth/register">Зарегистрироваться</a>
        </RegisterLinkContainer>
      </RightSideDiv>
    </FlexDiv>
  );
};
