import { AccountDto } from "../../Dto/accountDto";
import React from "react";
import {
  CardColumn,
  CardContainer,
  CardFieldName,
  CardField,
} from "../../Common/Components/viewsStyled";
import { AccountStatusDiv } from "./AccountStatusDiv";
import { Space } from "antd";

interface AccountCardProps {
  account: AccountDto;
  deleteHandler: Function;
  editHandler: Function;
}
export const AccountCard = (props: AccountCardProps) => {
  return (
    <CardContainer>
      <CardColumn>
        <CardFieldName>Номер</CardFieldName>
        <CardFieldName>Дата</CardFieldName>
        <CardFieldName>Взнос</CardFieldName>
        <CardFieldName>Оплачено</CardFieldName>
        <CardFieldName>Статус</CardFieldName>
        <CardFieldName>Действие</CardFieldName>
      </CardColumn>
      <CardColumn>
        <CardField>{props.account.id}</CardField>
        <CardField>
          {new Date(props.account.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
          }) +
            " " +
            new Date(props.account.date).getFullYear()}
        </CardField>
        <CardField>{props.account.deposit}</CardField>
        <CardField>{props.account.paid}</CardField>
        <CardField>
          <AccountStatusDiv status={props.account.state} />
        </CardField>
        <CardField>
          <Space size="middle">
            <a href="" onClick={() => props.deleteHandler(props.account.id)}>
              Delete{" "}
            </a>
            |
            <a href="" onClick={() => props.editHandler(props.account.id)}>
              Edit
            </a>
          </Space>
        </CardField>
      </CardColumn>
    </CardContainer>
  );
};
