import React, { useState, useEffect } from "react";
import { HeaderTitleDiv, HeaderTitle } from "../Layout/Header";
import { Pagination, PaginationProps } from "antd";
import { useAppSelector } from "../../Config/Redux/core";
import { DiscussionCard } from "./DiscussionCard";
import {
  PageBGSeparator,
  PageContainer,
} from "../../Common/Components/pageStyles";
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../Common/Constants/matchMediaqueries";
import { DiscussionDto } from "../../Dto/discussionDto";
import styled from "styled-components";
import { theme } from "../../Common/Constants/theme";

export const Discussions = () => {
  const discussionsAll = useAppSelector(
    (store) => store.discussions.discussions
  );
  const [activeId, setActiveId] = useState<number>();
  const [mobile] = useMatchMedia(matchMedieQueries);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = mobile ? 4 : 10;
  const [discussions, setDiscussions] = useState<DiscussionDto[]>(
    discussionsAll.slice(0, pageSize)
  );

  useEffect(() => {
    setDiscussions(discussionsAll.slice(0, pageSize));
  }, [discussionsAll]);

  const onChange: PaginationProps["onChange"] = (page: number) => {
    setCurrentPage(page);
    setDiscussions(
      discussionsAll.slice((page - 1) * pageSize, page * pageSize)
    );
  };

  return (
    <>
      <HeaderTitleDiv>
        <HeaderTitle>Общение</HeaderTitle>
      </HeaderTitleDiv>
      <PageBGSeparator>
        <PageContainer>
          <DiscussionContainer>
            {discussions.map((d) => (
              <div key={d.id} onClick={() => setActiveId(d.id)}>
                <DiscussionCard item={d} isActive={d.id === activeId} />
              </div>
            ))}

            {discussions.length > 10 && (
              <Pagination
                defaultCurrent={1}
                pageSize={pageSize}
                total={discussions.length}
                current={currentPage}
                onChange={onChange}
              />
            )}
          </DiscussionContainer>
        </PageContainer>
      </PageBGSeparator>
    </>
  );
};

const DiscussionContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${theme.mobile}) {
    padding: 16px;
  }
`;
