import React from "react";
import Modal from "antd/lib/modal/Modal";
import { CancelButtonStyled32, ButtonStyled32 } from "./buttonStyled";
import styled from "styled-components";
import { themeColors } from "../Constants/themeColors";

interface ModalConfirmProps {
  open: boolean;
  onOk: any;
  onCancel: any;
  title: string;
  text: string;
}
export const ModalConfirm = (props: ModalConfirmProps) => {
  return (
    <Modal
      style={{ top: 300 }}
      title=""
      open={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width={330}
      okText="Подтвердить"
      cancelText="Отмена"
      keyboard={true}
      wrap-class-name="my-special-modal"
      closable={false}
      footer={null}
      className="my-special-modal"
    >
      <ModalContainer>
        <ModalTitle>{props.title}</ModalTitle>
        <ModalText>{props.text}</ModalText>
        <ModalButtonsDiv>
          <CancelButtonStyled32 key="back" onClick={props.onCancel}>
            Отмена
          </CancelButtonStyled32>
          <ButtonStyled32 key="submit" onClick={props.onOk}>
            Подтвердить
          </ButtonStyled32>
        </ModalButtonsDiv>
      </ModalContainer>
    </Modal>
  );
};

const ModalButtonsDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  p {
    margin: 0;
  }
  margin: 0 -4px;
`;
const ModalTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: ${themeColors.gray9};
`;
const ModalText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: ${themeColors.gray8};
`;
