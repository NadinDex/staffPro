import React, { useState } from "react";
import { Tabs, Modal, Drawer } from "antd";
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
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../Common/Constants/matchMediaqueries";
import { theme } from "../../Common/Constants/theme";
import { HeaderTitle, HeaderTitleDiv } from "../Layout/Header";
import { AccountDto } from "../../Dto/accountDto";
import { AccountsState } from "./accountSlice";

const AccountAddButton = styled(ButtonStyled32)`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  margin: 0 24px 12px 0;
  @media (max-width: ${theme.mobile}) {
    margin: 0;
    margin-left: auto;
  }
`;

const dateSortingFunc = (x: AccountDto, y: AccountDto) =>
  Date.parse(JSON.stringify(x.date)) - Date.parse(JSON.stringify(x.date));
export const Accounts = () => {
  const tabItems = [
    {
      label: `Все счета`,
      key: 1,
      children: <AccountsList filter={(all: AccountDto[]) => all} />,
    },
    {
      label: `Ожидание оплаты`,
      key: 2,
      children: (
        <AccountsList
          filter={(all: AccountDto[]) =>
            all.filter((acc) => acc.state === AccountStatus[1].label)
          }
        />
      ),
    },
    {
      label: `Оплачено`,
      key: 3,
      children: (
        <AccountsList
          filter={(all: AccountDto[]) =>
            all.filter((acc) => acc.state === AccountStatus[0].label)
          }
        />
      ),
    },
    {
      label: `Просрочено`,
      key: 4,
      children: (
        <AccountsList
          filter={(all: AccountDto[]) =>
            all.filter((acc) => acc.state === AccountStatus[2].label)
          }
        />
      ),
    },
    {
      label: `Завершено`,
      key: 5,
      children: (
        <AccountsList
          filter={(all: AccountDto[]) =>
            all.filter((acc) => acc.state === AccountStatus[3].label)
          }
        />
      ),
    },
  ];
  const [mobile] = useMatchMedia(matchMedieQueries);
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
      <HeaderTitleDiv>
        <HeaderTitle>Счета</HeaderTitle>
        {mobile && operations}
      </HeaderTitleDiv>
      <TabContainer>
        <Tabs
          style={{ height: "100%" }}
          tabBarExtraContent={!mobile && operations}
          items={tabItems.map((x, i) => {
            return {
              label: x.label,
              key: String(x.key),
              children: (
                <PageBGSeparator>
                  <PageContainer>{x.children}</PageContainer>
                </PageBGSeparator>
              ),
            };
          })}
        />
      </TabContainer>
      <Drawer
        title="Добавление счета"
        placement="right"
        onClose={handleEditCancel}
        open={isEditFormOpen}
      >
        <AccountEdit
          onSubmit={handleEditOk}
          onClose={handleEditCancel}
          account={undefined}
        />
      </Drawer>
    </>
  );
};
