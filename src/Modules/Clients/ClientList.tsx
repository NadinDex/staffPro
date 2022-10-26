import React from "react";
import styled from "styled-components";
import { theme } from "../../Common/Constants/theme";
import { useAppSelector } from "../../Config/Redux/core";
import { ClientCard } from "./ClientCard";
import { themeColors } from "../../themeColors";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import { ClientAvatar } from "./clientStyledElements";
import { ClientDto } from "../../Dto/clientDto";

const ClientsMainContainer = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const TableView = styled.div`
  height: fit-content;
  @media (max-width: ${theme.mobile}) {
    height: 0;
    overflow: hidden;
  }

  .ant-table-tbody > tr > td {
    border: none;
  }
`;
const CardView = styled.div`
  height: 0;
  overflow: hidden;
  @media (max-width: ${theme.mobile}) {
    height: fit-content;
  }
  & > div:nth-child(even) {
    background: ${themeColors.gray1};
  }
  & > div:nth-child(odd) {
    background: ${themeColors.gray2};
  }
`;

export const ClientList = () => {
  const clients = useAppSelector((store) => store.clients.clients);
  const dateFormatOptions = { day: "numeric", month: "long", year: "numeric" };
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
    <ClientsMainContainer>
      <TableView>
        <Table dataSource={clients} columns={columns} rowKey="id" />
      </TableView>
      <CardView>
        {clients.map((client) => (
          <ClientCard client={client} key={client.id} />
        ))}
      </CardView>
    </ClientsMainContainer>
  );
};
