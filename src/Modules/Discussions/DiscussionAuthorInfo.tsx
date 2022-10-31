import { useAppSelector } from "../../Config/Redux/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ClientDto } from "../../Dto/clientDto";

const DiscussionAuthorInfoContainer = styled.div`
  display: flex;
  gap: 12px;
`;

interface DiscussionAuthorInfoProps {
  id: number;
}
export const DiscussionAuthorInfo = (props: DiscussionAuthorInfoProps) => {
  const [client, setClient] = useState<ClientDto>();
  const clients = useAppSelector((store) => store.clients.clients);
  useEffect(() => {
    setClient(clients.find((x) => x.id == props.id));
  }, [props.id]);

  return (
    <DiscussionAuthorInfoContainer>
      <img src={client?.imageSrc} /> <span>{client?.fullName}</span>
    </DiscussionAuthorInfoContainer>
  );
};
