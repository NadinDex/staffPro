import { DiscussionDto, DiscusCommentDto } from "../../Dto/discussionDto";
import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React, { useState, useMemo } from "react";
import Item from "antd/lib/list/Item";
import { useAppSelector, store, useAppDispatch } from "../../Config/Redux/core";
import { DiscussionAuthorInfo } from "./DiscussionAuthorInfo";
import DiscusIcon from "../../Asserts/Icons/discussions.svg";
import { Input } from "../../Common/Components/Input/Input";
import { List, Skeleton } from "antd";
import { discuccionsActions } from "./discusSlice";

const DiscucCardContainer = styled.div`
  background: ${themeColors.gray1};
  padding: 16px;
  display: flex;
  flex-direction: column;
  //gap: 16px;
`;

interface DiscucCardMainContainerProps {
  isActive: boolean;
}
const DiscucCardMainContainer = styled.div<DiscucCardMainContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: ${themeColors.gray2};
  border: 1px solid ${themeColors.gray3};

  border-radius: 12px 12px ${(props) => (props.isActive ? "0 0" : "")};
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
const DiscucCardCommentsContainer = styled.div`
  background: ${themeColors.gray1};
  border: 1px solid ${themeColors.gray3};
  border-radius: 0px 0px 12px 12px;
  border-top: none;
  padding: 20px;
`;

interface DiscussionCardProps {
  item: DiscussionDto;
  isActive: boolean;
}
export const DiscussionCard = (props: DiscussionCardProps) => {
  const clients = useAppSelector((store) => store.clients.clients);
  const [showAll, setShowAll] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const commitComment = (text: string, id: number) => {
    dispatch(
      discuccionsActions.addComment({
        discussionId: id,
        text: text,
        authorId: 1, //TODO fix
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
      {props.isActive && (
        <DiscucCardCommentsContainer>
          {props.item.comments && (
            <>
              {props.item.comments.length > 1 && !showAll && (
                <span onClick={() => setShowAll(true)}>
                  {"Посмотреть еще " +
                    (props.item.comments.length - 1) +
                    " комментариев"}
                </span>
              )}
              {showAll ? (
                props.item.comments.map((c) => (
                  <div>
                    <DiscussionAuthorInfo id={c.authorId} />
                    <p>{c.text}</p>
                  </div>
                ))
              ) : (
                <div>
                  <DiscussionAuthorInfo
                    id={
                      props.item.comments[props.item.comments.length - 1]
                        .authorId
                    }
                  />
                  <p>
                    {props.item.comments[props.item.comments.length - 1].text}
                  </p>
                </div>
              )}
            </>
          )}
          <Input
            onKeyUp={(event) => {
              event.keyCode === 13 &&
                commitComment("some comment text", props.item.id);
            }}
          />
        </DiscucCardCommentsContainer>
      )}
    </DiscucCardContainer>
  );
};
