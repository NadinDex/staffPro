import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React from "react";
import { FlexDiv } from "../../Common/Components/flexDiv";
import { LoginForm } from "./LoginForm";
import VectorSvg from "../../Asserts/images/Vector.svg";

const LeftSideDiv = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  background: ${themeColors.blue6};
`;
const Vector = styled.div`
  margin-top: auto;
  img {
    bottom: 40px;
    right: 40px;
    left: 40px;
    width: calc(100%-80px);
  }
`;
const RightSideDiv = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;
const RegisterLinkContainer = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: ${themeColors.gray1};

  border: 1px solid ${themeColors.gray5};

  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${themeColors.gray10};
  }
  link {
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
        <LogoText>Staff Pro</LogoText>
        <SomeText>Автоматизированные HR процессы</SomeText>
        <SomeText>Добро пожаловать!</SomeText>
        <Vector>
          <img src={VectorSvg} />
        </Vector>
      </LeftSideDiv>
      <RightSideDiv>
        <LoginForm />
        <RegisterLinkContainer>
          <span>Нет аккаунта? &nbsp;</span>
          <link>Зарегистрироваться</link>
        </RegisterLinkContainer>
      </RightSideDiv>
    </FlexDiv>
  );
};
