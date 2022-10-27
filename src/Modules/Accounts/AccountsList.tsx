import React, { useState } from "react";
import { TableView, CardView } from "../../Common/Components/viewsStyled";
import { Table, Space, Modal } from "antd";
import { useAppSelector, useAppDispatch } from "../../Config/Redux/core";
import { AccountCard } from "./AccountCard";
import { accountActions } from "./accountSlice";
import { AccountDto } from "../../Dto/accountDto";
import { AppStateType } from "../../Config/Redux/configureStore";
import { AccountStatusDiv } from "./AccountStatusDiv";
import { ColumnsType } from "antd/lib/table";
import styled from "styled-components";
import { AccountEdit } from "./AccountEdit";
import { themeColors } from "../../themeColors";
import { AccountAddButtons } from "./AccountAddButtons";

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
    },
    {
      title: "Оплачено",
      dataIndex: "paid",
      key: "paid",
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
    //width: 100vw;
    margin: 0;
    top: 0;
    right: 0;
  }
  .ant-modal-body {
    height: calc(100vh - 110px);
  }
`;

interface AccountsListProps {
  filter: (store: AppStateType) => AccountDto[];
}

export const AccountsList = (props: AccountsListProps) => {
  const dispatch = useAppDispatch();

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();

  const handleDeleteOk = () => {
    setIsDeleteConfirmOpen(false);
    dispatch(accountActions.deleteAccount(deleteId));
  };
  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false);
  };
  const deleteAccount = (id: string) => {
    setDeleteId(id);
    setIsDeleteConfirmOpen(true);
  };

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

  const accounts = useAppSelector(props.filter);
  return (
    <AccountContainer>
      <TableView>
        <Table
          dataSource={accounts}
          columns={accountColumns(deleteAccount, editAccount)}
          rowKey="id"
        />
      </TableView>
      <CardView>
        {accounts.map((account) => (
          <AccountCard
            account={account}
            key={account.id}
            deleteHandler={deleteAccount}
            editHandler={editAccount}
          />
        ))}
      </CardView>
      <AccountEdit
        show={isEditFormOpen}
        onSubmit={handleEditOk}
        onClose={handleEditCancel}
      />
      <Modal
        title=""
        open={isDeleteConfirmOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <DeleteModalContainer>
          <DeleteModalTitle>Удаление счета</DeleteModalTitle>
          <DeleteModalText>
            Вы действительно хотите удалить счет?
          </DeleteModalText>
        </DeleteModalContainer>
      </Modal>
    </AccountContainer>
  );
};

const DeleteModalContainer = styled.div``;
const DeleteModalTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: ${themeColors.gray9};
`;
const DeleteModalText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: ${themeColors.gray8};
`;

/*
<Modal
        title=""
        open={isDeleteConfirmOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <DeleteModalContainer>
          <DeleteModalTitle></DeleteModalTitle>
          <DeleteModalText></DeleteModalText>
        </DeleteModalContainer>
      </Modal>

<Modal
        title="Account"
        style={{ left: 0, top: 0, bottom: 0 }}
        open={isEditFormOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={[<AccountAddButtons />]}
      >
        <AccountEdit />
      </Modal>

      */
