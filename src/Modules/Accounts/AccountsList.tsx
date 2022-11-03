import React, { useState, useEffect } from "react";
import { TableView, CardView } from "../../Common/Components/viewsStyled";
import { Table, Space, Drawer, Pagination, PaginationProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../Config/Redux/core";
import { AccountCard } from "./AccountCard";
import {
  accountActions,
  selectAllAccounts,
  accountSelectorWithFilter,
} from "./accountSlice";
import { AccountDto } from "../../Dto/accountDto";
import { AccountStatusDiv } from "./AccountStatusDiv";
import { ColumnsType } from "antd/lib/table";
import styled from "styled-components";
import { AccountEdit } from "./AccountEdit";
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../Common/Constants/matchMediaqueries";

import { PaginationContainer } from "../../Common/Components/pageStyles";
import { ModalConfirm } from "../../Common/Components/ModalConfirm";

const accountColumns = (
  deleteHandler: Function,
  editHandler: Function
): ColumnsType<AccountDto> => {
  return [
    {
      title: "Номер",
      dataIndex: "id",
      key: "id",
      width: "34.5%",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (_, account) => (
        <>
          {new Date(account.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
          }) +
            " " +
            new Date(account.date).getFullYear()}
        </>
      ),
    },
    {
      title: "Взнос",
      dataIndex: "deposit",
      key: "deposit",
      width: "10.5%",
      className: "column-money",
      align: "right",
    },
    {
      title: "Оплачено",
      dataIndex: "paid",
      key: "paid",
      className: "column-money",
      align: "right",
    },
    {
      title: "Статус",
      dataIndex: "state",
      key: "state",
      render: (_, account) => (
        <>
          <AccountStatusDiv status={account.state} />
        </>
      ),
    },
    {
      title: "Действие",
      key: "value",
      width: "8%",
      render: (_, record) => (
        <Space size="middle">
          <a href="#" onClick={() => deleteHandler(record.id)}>
            Delete{" "}
          </a>
          |
          <a href="#" onClick={() => editHandler(record.id)}>
            Edit
          </a>
        </Space>
      ),
    },
  ];
};

const AccountContainer = styled.div`
  padding: 24px;

  .ant-modal,
  .ant-modal-content {
    height: 100vh;
    margin: 0;
    top: 0;
    right: 0;
  }
  .ant-modal-body {
    height: calc(100vh - 110px);
  }
  .ant-modal-header {
    border-bottom-width: 0;
  }
  .ant-modal-footer {
    border-top-width: 0;
  }
  .ant-modal-close {
    display: none;
  }
  .my-special-modal {
    .ant-modal-header {
      border-bottom-width: 0;
    }
    .ant-modal-footer {
      border-top-width: 0;
    }
  }
`;

interface AccountsListProps {
  filter: (accounts: AccountDto[]) => AccountDto[];
}

export const AccountsList = (props: AccountsListProps) => {
  const [mobile] = useMatchMedia(matchMedieQueries);
  const dispatch = useAppDispatch();

  //const accounts = useAppSelector(selectAllAccounts);
  const accounts = useAppSelector(accountSelectorWithFilter(props.filter));
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = mobile ? 4 : 10;
  const [accountsForPage, setAccountsForPage] = useState<AccountDto[]>();
  useEffect(() => {
    setAccountsForPage(accounts.slice(0, pageSize));
  }, []);

  //--------------------
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const handleDeleteOk = () => {
    setIsDeleteConfirmOpen(false);
    if (deleteId) dispatch(accountActions.deleteAccount(deleteId));
  };
  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false);
  };
  const deleteAccount = (id: number) => {
    setDeleteId(id);
    setIsDeleteConfirmOpen(true);
  };
  //--------------------
  const [isEditFormOpen, setIsEditModalOpen] = useState(false);
  const [accountForEdit, setAccountForEdit] = useState<AccountDto>();
  const editAccount = (id: string) => {
    setIsEditModalOpen(true);
    setAccountForEdit(accountsForPage?.find((x) => x.id === id));
  };
  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const onPageChange: PaginationProps["onChange"] = (page: number) => {
    setCurrentPage(page);
    setAccountsForPage(
      accounts ? accounts.slice((page - 1) * pageSize, page * pageSize) : []
    );
  };

  return (
    <AccountContainer>
      {!mobile ? (
        <TableView>
          <Table
            dataSource={accounts}
            columns={accountColumns(deleteAccount, editAccount)}
            rowKey="id"
            pagination={accounts.length < 10 ? false : {}}
          />
        </TableView>
      ) : (
        <>
          <CardView>
            {accountsForPage?.map((account) => (
              <AccountCard
                account={account}
                key={account.id}
                deleteHandler={deleteAccount}
                editHandler={editAccount}
              />
            ))}
          </CardView>
          {accounts.length > 10 && (
            <PaginationContainer>
              <Pagination
                defaultCurrent={1}
                pageSize={mobile ? 4 : 10}
                total={accounts.length}
                current={currentPage}
                onChange={onPageChange}
              />
            </PaginationContainer>
          )}
        </>
      )}
      <Drawer
        title="Редактирование счета"
        placement="right"
        open={isEditFormOpen}
        onClose={handleEditCancel}
        destroyOnClose={true}
      >
        <AccountEdit
          account={accountForEdit}
          onSubmit={handleEditOk}
          onClose={handleEditCancel}
        />
      </Drawer>

      <ModalConfirm
        open={isDeleteConfirmOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        title="Удаление счета"
        text="Вы действительно хотите удалить счет?"
      />
    </AccountContainer>
  );
};
