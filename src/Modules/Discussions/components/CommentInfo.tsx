import { useAppSelector } from "../../../Config/Redux/core";
import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import noPerson from "../../../Asserts/Icons/noPerson.svg";
import { themeColors } from "../../../Common/Constants/themeColors";
import { AppStateType } from "../../../Config/Redux/configureStore";

const CommentInfoContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 16px 0;

  span {
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    color: ${themeColors.gray9};
  }
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    color: ${themeColors.dark2};
  }
`;
const NameContainer = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.dark1};
`;

interface CommentInfoProps {
  id: number;
  text: string;
}
export const CommentInfo = (props: CommentInfoProps) => {
  const user = useAppSelector((store: AppStateType) =>
    store.user.users.find((x) => x.id == props.id)
  );

  return (
    <CommentInfoContainer>
      {user?.avatar ? (
        <img src={user?.avatar} width="24" height="24" />
      ) : (
        <SVG src={noPerson} fill={themeColors.gray8} />
      )}
      <TextDiv>
        <NameContainer>
          {user?.lastName + " " + user?.firstName + " " + user?.fatherName}
        </NameContainer>
        <p>{props.text}</p>
      </TextDiv>
    </CommentInfoContainer>
  );
};
