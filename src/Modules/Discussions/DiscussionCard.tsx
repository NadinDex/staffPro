import { DiscussionDto, DiscusCommentDto } from "../../Dto/discussionDto";
import styled, { keyframes } from "styled-components";
import { themeColors } from "../../themeColors";
import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../Config/Redux/core";
import { DiscussionAuthorInfo } from "./DiscussionAuthorInfo";
import DiscusIcon from "../../Asserts/Icons/discussions.svg";
import { Input } from "../../Common/Components/Input/Input";
import { discuccionsActions } from "./discusSlice";
import { CommentInfo } from "./CommentInfo";
import { openAppNotification } from "../../App";

const DiscucCardContainer = styled.div`
  background: ${themeColors.gray1};
  display: flex;
  flex-direction: column;
  max-width: 879px;
`;

interface DiscucCardMainContainerProps {
  isActive: boolean;
}
const DiscucCardMainContainer = styled.div<DiscucCardMainContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: ${themeColors.gray2};
  border: 1px solid ${themeColors.gray3};
  max-width: 879px;

  border-radius: 12px 12px ${(props) => (props.isActive ? "0 0" : "")};
  p {
    margin: 0;
  }
`;

const DiscucCardMainTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${themeColors.gray9};
`;
const DiscucCardMainText = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${themeColors.gray8};
`;
const DiscucCardMainFooter = styled.div`
  display: flex;
  width: 100%;
`;
const CommentsCountDiv = styled.div`
  margin-left: auto;
  display: flex;
  gap: 7px;
  align-items: center;
`;
const DiscucCardCommentsContainer = styled.div<DiscucCardMainContainerProps>`
  background: ${themeColors.gray1};
  border: 1px solid ${themeColors.gray3};
  border-radius: 0px 0px 12px 12px;
  border-top: none;
  padding: ${(props) => (props.isActive ? "17px 20px" : "0")};

  //height: 0px;
  //transition: height 1s 0.3s;
  transition: max-height 0.8s ease-out; // note that we're transitioning max-height, not height!
  //transition: visibility 0.2s ease-out;
  height: auto;
  max-height: ${(props) => (props.isActive ? "100%" : "0")};
`;
const ExtraCommentsSpan = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.blue8};
`;

interface DiscussionCardProps {
  item: DiscussionDto;
  isActive: boolean;
}
export const DiscussionCard = (props: DiscussionCardProps) => {
  const currentUser = useAppSelector((store) => store.user.currentUser);
  const [showAll, setShowAll] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const commitComment = (text: string, id: number) => {
    if (!currentUser) {
      openAppNotification({ message: "Нет  текущего юзера" });
      return;
    }
    dispatch(
      discuccionsActions.addComment({
        discussionId: id,
        text: text,
        authorId: currentUser?.id,
      } as DiscusCommentDto)
    );
  };

  return (
    <DiscucCardContainer>
      <DiscucCardMainContainer isActive={props.isActive}>
        <DiscucCardMainTitle>{props.item.title}</DiscucCardMainTitle>
        <DiscucCardMainText>{props.item.text}</DiscucCardMainText>
        <DiscucCardMainFooter>
          <DiscussionAuthorInfo id={props.item.authorId} />
          <CommentsCountDiv>
            <img src={DiscusIcon} width="12" height="12" />
            <span>{props.item.comments ? props.item.comments.length : 0}</span>
          </CommentsCountDiv>
        </DiscucCardMainFooter>
      </DiscucCardMainContainer>

      <DiscucCardCommentsContainer
        isActive={props.isActive}
        style={{ visibility: props.isActive ? "visible" : "hidden" }}
      >
        {props.item.comments && (
          <>
            {props.item.comments.length > 1 && !showAll && (
              <ExtraCommentsSpan onClick={() => setShowAll(true)}>
                {"Посмотреть еще " +
                  (props.item.comments.length - 1) +
                  " комментариев"}
              </ExtraCommentsSpan>
            )}
            {showAll ? (
              props.item.comments.map((c, index) => (
                <CommentInfo id={c.authorId} text={c.text} key={index} />
              ))
            ) : (
              <CommentInfo
                id={
                  props.item.comments[props.item.comments.length - 1].authorId
                }
                text={props.item.comments[props.item.comments.length - 1].text}
              />
            )}
          </>
        )}
        <Input
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              commitComment(event.currentTarget.value, props.item.id);
              event.currentTarget.value = "";
            }
          }}
        />
      </DiscucCardCommentsContainer>
    </DiscucCardContainer>
  );
};
//{props.isActive && ()}
