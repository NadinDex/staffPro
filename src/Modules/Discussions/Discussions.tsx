import React, { useState } from "react";
import { HeaderTitleDiv, HeaderTitle } from "../Layout/Header";
import { Pagination } from "antd";
import { useAppSelector } from "../../Config/Redux/core";
import { DiscussionCard } from "./DiscussionCard";

export const Discussions = () => {
  const discussions = useAppSelector((store) => store.discussions.discussions);
  const [activeId, setActiveId] = useState<number>();
  return (
    <>
      <HeaderTitleDiv>
        <HeaderTitle>Общение</HeaderTitle>
      </HeaderTitleDiv>
      {discussions.map((d) => (
        <div onClick={() => setActiveId(d.id)}>
          <DiscussionCard item={d} isActive={d.id === activeId} />
        </div>
      ))}

      {discussions.length > 10 && (
        <Pagination defaultCurrent={1} total={discussions.length} />
      )}
    </>
  );
};
