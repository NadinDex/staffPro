import React from "react";
import { useAppSelector } from "../../Config/Redux/core";
import styled from "styled-components";
import { themeColors } from "../../themeColors";
import { ClientDto } from "../../Dto/clientDto";

const ClientTableHeaderRow = styled.div`
  background: ${themeColors.gray2};
`;
const ClientTableHeaderTitle = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray9};
`;
const ClientTableRow = styled.div`
  background: ${themeColors.gray1};
`;

export const ClientsTable = () => {
  const clients = useAppSelector((store) => store.clients.clients);
  return (
    <ClientTableHeaderRow>
      <div></div>
    </ClientTableHeaderRow>
  );
};
