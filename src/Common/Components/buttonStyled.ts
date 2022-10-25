import styled from "styled-components";
import { themeColors } from "../../themeColors";

export const ButtonStyled = styled.button`
  padding: 8px 16px;

  height: 40px;
  background: ${themeColors.blue6};
  border-radius: 2px;
  border: none;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: ${themeColors.gray1};
`;
