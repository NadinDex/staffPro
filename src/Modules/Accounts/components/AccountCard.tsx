import { AccountViewDto, AccountDto } from "../../../Dto/accountDto";
import React from "react";
import {
  CardColumn,
  CardContainer,
  CardFieldName,
  CardField,
  CardColumn1,
} from "../../../Common/Components/viewsStyled";
import { AccountStatusDiv } from "./AccountStatusDiv";
import { Space } from "antd";
import { FormattedNumber } from "react-intl";

interface AccountCardProps {
  account: AccountDto;
  deleteHandler: Function;
  editHandler: Function;
}
export const AccountCard = (props: AccountCardProps) => {
  return (
    <CardContainer>
      <CardColumn1>
        <CardFieldName>Номер</CardFieldName>
        <CardFieldName>Дата</CardFieldName>
        <CardFieldName>Взнос</CardFieldName>
        <CardFieldName>Оплачено</CardFieldName>
        <CardFieldName>Статус</CardFieldName>
        <CardFieldName>Действие</CardFieldName>
      </CardColumn1>
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
        <CardField>
          <FormattedNumber
            value={props.account.deposit}
            style="currency"
            currency="USD"
            minimumFractionDigits={0}
            maximumFractionDigits={2}
          />
        </CardField>
        <CardField>
          <FormattedNumber
            value={props.account.paid}
            style="currency"
            currency="USD"
            minimumFractionDigits={0}
            maximumFractionDigits={2}
          />
        </CardField>
        <CardField>
          <AccountStatusDiv status={props.account.state} />
        </CardField>
        <div>
          <Space size="middle">
            <a href="#" onClick={() => props.deleteHandler(props.account.id)}>
              Delete{" "}
            </a>
            |
            <a href="#" onClick={() => props.editHandler(props.account.id)}>
              Edit
            </a>
          </Space>
        </div>
      </CardColumn>
    </CardContainer>
  );
};
