import styled from "styled-components";
import React from "react";
import { themeColors } from "../../../Common/Constants/themeColors";
import { ClientDto } from "../../../Dto/clientDto";
import { ClientAvatar } from "../components/clientStyledElements";

const ClientCardContainer = styled.div`
  background: ${themeColors.gray2};
  padding: 16px;
  display: flex;
  gap: 16px;
`;
const ClientCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 0 120px;
`;

const ClientCardFieldName = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray9};
`;
const ClientCardField = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray8};
`;

interface ClientCardProps {
  client: ClientDto;
}

export const ClientCard = (props: ClientCardProps) => {
  return (
    <ClientCardContainer>
      <ClientCardColumn>
        <ClientCardFieldName>Клиент</ClientCardFieldName>
        <ClientCardFieldName>Номер телефона</ClientCardFieldName>
        <ClientCardFieldName>E-mail</ClientCardFieldName>
        <ClientCardFieldName>Компания</ClientCardFieldName>
        <ClientCardFieldName>Дата добавления</ClientCardFieldName>
      </ClientCardColumn>
      <ClientCardColumn>
        <ClientCardField>
          <ClientAvatar src={props.client.imageSrc} />
          {props.client.fullName}
        </ClientCardField>
        <ClientCardField>{props.client.phone}</ClientCardField>
        <ClientCardField>{props.client.email}</ClientCardField>
        <ClientCardField>{props.client.company}</ClientCardField>
        <ClientCardField>
          {new Date(props.client.dateUpdate).toDateString()}
        </ClientCardField>
      </ClientCardColumn>
    </ClientCardContainer>
  );
};
