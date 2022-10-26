import styled from "styled-components";
import { themeColors } from "../../themeColors";
import { theme } from "../../Common/Constants/theme";

interface FullScreenDivProps {
  gap?: string;
}

export const FullScreanDiv = styled.div<FullScreenDivProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  gap: ${(props) => props.gap ?? "64px"};

  background: ${themeColors.BG};
  @media (max-width: ${theme.mobile}) {
    background: ${themeColors.gray1};
  }
`;

export const FormHeaderText = styled.p`
  color: ${themeColors.gray9};
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  width: 100%;
  margin: 0;
`;

export const LogoText = styled.p`
  font-weight: 400;
  font-size: 56px;
  line-height: 64px;
  text-align: center;
  width: 100%;

  width: 493px;
  height: 64px;
  margin: 0;

  color: ${themeColors.gray10};
`;

export const RegisterLinkContainer = styled.div`
  background: ${themeColors.gray1};
  margin: auto;

  @media (max-width: ${theme.mobile}) {
    position: relative;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${themeColors.gray10};
  }
  a {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${themeColors.blue6};
    text-decoration: none;
  }
`;
