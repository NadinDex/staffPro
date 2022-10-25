import styled from "styled-components";
import { HTMLAttributes } from "react";
import { theme } from "../Constants/theme";

export interface PropsType extends HTMLAttributes<HTMLHeadingElement> {
  direction?: string;
  justify?: string;
}
export const FlexDiv = styled.div<PropsType>`
  display: flex;
  flex-direction: ${(props: PropsType) => props.direction || "row"};
  justify-content: ${(props: PropsType) => props.justify || "stretch"};
  align-items: stretch;
  margin: 0;
  @media (max-width: ${theme.mobile}) {
    flex-direction: column;
  }
`;
