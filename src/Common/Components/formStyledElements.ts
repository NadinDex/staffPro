import styled from "styled-components";
import { themeColors } from "../../themeColors";
import { theme } from "../Constants/theme";

export const FormElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const FormGroupGap8 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const FormGroupGap2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const FormLabelStyled = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  color: ${themeColors.gray9};
`;
export const RowOfTwo = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  @media (max-width: ${theme.mobile}) {
    flex-direction: column;
    gap: 16px;
  }
  & > div {
    width: 50%;
    @media (max-width: ${theme.mobile}) {
      width: 100%;
    }
  }
`;
export const RowOfElements = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: ${theme.mobile}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const FormGroupSeparator = styled.div`
  width: 100%;
  height: 0px;
`;
