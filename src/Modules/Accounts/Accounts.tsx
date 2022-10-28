import React, { useState } from "react";
import { Tabs, Modal } from "antd";
import styled from "styled-components";
import {
  PageBGSeparator,
  PageContainer,
  TabContainer,
} from "../../Common/Components/pageStyles";
import { ButtonStyled32 } from "../../Common/Components/buttonStyled";
import { AppStateType } from "../../Config/Redux/configureStore";
import { AccountStatus } from "../../Common/Constants/accountStatus";
import { AccountsList } from "./AccountsList";
import { AccountEdit } from "./AccountEdit";

const AccountAddButton = styled(ButtonStyled32)`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  margin: 0 24px 12px 0;
`;

export const Accounts = () => {
  const tabItems = [
    {
      label: `Все счета`,
      key: 1,
      children: (
        <AccountsList
          filter={(store: AppStateType) => store.accounts.accounts}
        />
      ),
    },
    {
      label: `Ожидание оплаты`,
      key: 2,
      children: (
        <AccountsList
          filter={(store: AppStateType) =>
            store.accounts.accounts.filter(
              (acc) =>
                acc.state === AccountStatus.find((x) => x.value === 1)?.label
            )
          }
        />
      ),
    },
    {
      label: `Оплачено`,
      key: 3,
      children: (
        <AccountsList
          filter={(store: AppStateType) =>
            store.accounts.accounts.filter(
              (acc) =>
                acc.state === AccountStatus.find((x) => x.value === 0)?.label
            )
          }
        />
      ),
    },
    {
      label: `Просрочено`,
      key: 4,
      children: (
        <AccountsList
          filter={(store: AppStateType) =>
            store.accounts.accounts.filter(
              (acc) =>
                acc.state === AccountStatus.find((x) => x.value === 2)?.label
            )
          }
        />
      ),
    },
    {
      label: `Завершено`,
      key: 5,
      children: (
        <AccountsList
          filter={(store: AppStateType) =>
            store.accounts.accounts.filter(
              (acc) =>
                acc.state === AccountStatus.find((x) => x.value === 3)?.label
            )
          }
        />
      ),
    },
  ];
  const operations = (
    <AccountAddButton onClick={() => editAccount()}>
      + Добавить новый счет
    </AccountAddButton>
  );

  const [isEditFormOpen, setIsEditModalOpen] = useState(false);
  const editAccount = () => {
    setIsEditModalOpen(true);
  };
  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <TabContainer>
        <Tabs
          style={{ height: "100%" }}
          tabBarExtraContent={operations}
          items={tabItems.map((x, i) => {
            const id = String(i);
            return {
              label: x.label,
              key: id,
              children: (
                <PageBGSeparator>
                  <PageContainer>{x.children}</PageContainer>
                </PageBGSeparator>
              ),
            };
          })}
        />
      </TabContainer>

      <AccountEdit
        show={isEditFormOpen}
        onClose={handleEditCancel}
        onSubmit={handleEditOk}
      />
    </>
  );
};
