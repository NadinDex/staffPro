import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../Config/Redux/core";
import { ClientCard } from "./ClientCard";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import { ClientAvatar } from "./clientStyledElements";
import { ClientDto } from "../../Dto/clientDto";
import { TableView, CardView } from "../../Common/Components/viewsStyled";
import {
  PageContainer,
  PageBGSeparator,
} from "../../Common/Components/pageStyles";
import { theme } from "../../Common/Constants/theme";
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../Common/Constants/matchMediaqueries";

const ClientsMainContainer = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ClientList = () => {
  const [mobile] = useMatchMedia(matchMedieQueries);
  const clients = useAppSelector((store) => store.clients.clients);
  const columns: ColumnsType<ClientDto> = [
    {
      title: "Клиент",
      dataIndex: "fullName",
      key: "id",
      width: "25%",
      render: (_, client) => (
        <>
          <ClientAvatar src={client.imageSrc} />
          {client.fullName}
        </>
      ),
    },
    {
      title: "Номер телефона",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Компания",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Дата добавления",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
      render: (_, client) => (
        <>
          {new Date(client.dateUpdate).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
          }) +
            " " +
            new Date(client.dateUpdate).getFullYear()}
        </>
      ),
    },
  ];

  return (
    <PageBGSeparator>
      <PageContainer>
        <ClientsMainContainer>
          {!mobile ? (
            <TableView>
              <Table dataSource={clients} columns={columns} rowKey="id" />
            </TableView>
          ) : (
            <CardView>
              {clients.map((client) => (
                <ClientCard client={client} key={client.id} />
              ))}
            </CardView>
          )}
        </ClientsMainContainer>
      </PageContainer>
    </PageBGSeparator>
  );
};
