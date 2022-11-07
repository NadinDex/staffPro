import React, { useState, useMemo } from "react";
import { Tabs, Drawer } from "antd";
import styled from "styled-components";
import {
  PageBGSeparator,
  PageContainer,
  TabContainer,
} from "../../../Common/Components/pageStyles";
import { ButtonStyled32 } from "../../../Common/Components/buttonStyled";
import { AccountStatus } from "../../../Common/Constants/accountStatus";
import { AccountsList } from "./AccountsList";
import { AccountEdit } from "./AccountEdit";
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../../Common/Constants/matchMediaqueries";
import { theme } from "../../../Common/Constants/theme";
import { HeaderTitle, HeaderTitleDiv } from "../../Layout/components/Header";
import { AccountDto } from "../../../Dto/accountDto";

const AccountAddButton = styled(ButtonStyled32)`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  margin: 0 24px 12px 0;
  @media (max-width: ${theme.mobile}) {
    margin: 0;
    margin-left: auto;
    width: fit-content;
  }

  @media (max-width: ${theme.minimobile}) {
    margin: 0;
    width: fit-content;
  }
`;

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

export const Accounts = () => {
  const [mobile] = useMatchMedia(matchMedieQueries);

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

  const operations = useMemo(
    () => (
      <AccountAddButton onClick={() => editAccount()}>
        + Добавить новый счет
      </AccountAddButton>
    ),
    [editAccount]
  );

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
          items={tabItems.map((x) => {
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
