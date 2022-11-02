import React, { useState, useEffect } from "react";
import { TableView, CardView } from "../../Common/Components/viewsStyled";
import { Table, Space, Modal, Drawer, Pagination, PaginationProps } from "antd";
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
import { theme } from "../../Common/Constants/theme";
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../Common/Constants/matchMediaqueries";
import {
  CancelButtonStyled32,
  ButtonStyled32,
} from "../../Common/Components/buttonStyled";
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
  filter: (store: AppStateType) => AccountDto[];
}

export const AccountsList = (props: AccountsListProps) => {
  const [mobile] = useMatchMedia(matchMedieQueries);

  const dispatch = useAppDispatch();
  const accounts = useAppSelector(props.filter).sort(
    (x, y) =>
      Date.parse(JSON.stringify(x.date)) - Date.parse(JSON.stringify(x.date))
  );
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
  const [accountForEdit, setAccountForEdit] = useState<AccountDto>();
  const editAccount = (id: string) => {
    setIsEditModalOpen(true);
    setAccountForEdit(accounts.find((x) => x.id === id));
  };
  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = mobile ? 4 : 10;
  const [accountsForPage, setAccountsForPage] = useState<AccountDto[]>(
    accounts.slice(0, pageSize)
  );

  const onChange: PaginationProps["onChange"] = (page: number) => {
    setCurrentPage(page);
    setAccountsForPage(accounts.slice((page - 1) * pageSize, page * pageSize));
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
            {accountsForPage.map((account) => (
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
                onChange={onChange}
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
          show={isEditFormOpen}
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

/*
<Modal
        title=""
        open={isDeleteConfirmOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        width={330}
        okText="Подтвердить"
        cancelText="Отмена"
        keyboard={true}
        wrap-class-name="my-special-modal"
        closable={false}
        footer={null}
        centered={true}
      >
        <DeleteModalContainer>
          <DeleteModalTitle>Удаление счета</DeleteModalTitle>
          <DeleteModalText>
            Вы действительно хотите удалить счет?
          </DeleteModalText>
          <ModalButtonsDiv>
            <CancelButtonStyled32 key="back" onClick={handleDeleteCancel}>
              Отмена
            </CancelButtonStyled32>
            <ButtonStyled32 key="submit" onClick={handleDeleteOk}>
              Подтвердить
            </ButtonStyled32>
          </ModalButtonsDiv>
        </DeleteModalContainer>
      </Modal>
*/

const ModalButtonsDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const DeleteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  p {
    margin: 0;
  }
`;
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
