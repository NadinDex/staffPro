import {
  AccountStatusType,
  AccountStatus,
} from "../../../Common/Constants/accountStatus";
import styled from "styled-components";
import React from "react";

interface StyledStatusDivProps {
  status: AccountStatusType;
}
const StyledStatusDiv = styled.div<StyledStatusDivProps>`
  box-sizing: border-box;

  padding: 1px 8px;

  width: fit-content;

  background: ${(props) => props.status.bgColor};
  border: 1px solid ${(props) => props.status.borderColor};
  border-radius: 2px;
  color: ${(props) => props.status.color};
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

interface AccountStatusDivProps {
  status: string;
}
export const AccountStatusDiv = (props: AccountStatusDivProps) => {
  const status = AccountStatus.find((x) => x.label == props.status);
  if (!status) return <></>;
  return <StyledStatusDiv status={status}>{status?.label}</StyledStatusDiv>;
};
