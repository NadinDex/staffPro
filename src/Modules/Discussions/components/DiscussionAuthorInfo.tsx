import { useAppSelector } from "../../../Config/Redux/core";
import React from "react";
import styled from "styled-components";
import { clientAvatarServerUrl } from "../../../Common/Constants/names";
import SVG from "react-inlinesvg";
import noPerson from "../../../Asserts/Icons/noPerson.svg";
import { themeColors } from "../../../Common/Constants/themeColors";

const DiscussionAuthorInfoContainer = styled.div`
  display: flex;
  gap: 12px;
  span {
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    color: ${themeColors.gray9};
  }
`;

interface DiscussionAuthorInfoProps {
  id: number;
}
export const DiscussionAuthorInfo = (props: DiscussionAuthorInfoProps) => {
  const client = useAppSelector((store) =>
    store.clients.clients.find((x) => x.id == props.id)
  );

  return (
    <DiscussionAuthorInfoContainer>
      {client?.imageSrc ? (
        <img
          src={clientAvatarServerUrl + client?.imageSrc}
          width="24"
          height="24"
        />
      ) : (
        <SVG src={noPerson} fill={themeColors.gray8} />
      )}
      <span>{client?.fullName ?? client?.company}</span>
    </DiscussionAuthorInfoContainer>
  );
};
