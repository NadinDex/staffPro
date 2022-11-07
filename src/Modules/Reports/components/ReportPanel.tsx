import styled from "styled-components";
import { themeColors } from "../../../Common/Constants/themeColors";
import React, { useState, useEffect } from "react";
import { ReportDto } from "../../../Dto/reportsDto";
import favIco from "../../../Asserts/Icons/favIco.svg";
import noFavIco from "../../../Asserts/Icons/favNoIco.svg";
import panelArrow from "../../../Asserts/Icons/panelArrow.svg";
import { Tag } from "antd";
import SVG from "react-inlinesvg";
import { useAppDispatch, useAppSelector } from "../../../Config/Redux/core";
import { reportsActions } from "../reportSlice";
import { openAppNotification } from "../../../App";

interface ReportPanelStyledProps {
  isOpen?: boolean;
}

const ReportPanelStyled = styled.div<ReportPanelStyledProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  gap: 12px;

  background: ${themeColors.gray2};
  border-bottom: ${(props) =>
    !props.isOpen ? "1px solid " + themeColors.gray4 : "none"};

  ${(props: ReportPanelStyledProps) =>
    props.isOpen ? "svg {transform: rotate(180deg);}" : ""}
`;

const ReportRightDiv = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ReportTitle = styled.span<ReportPanelStyledProps>`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: ${(props) => (props.isOpen ? themeColors.blue6 : themeColors.gray9)};
`;

const ReportContent = styled.div<ReportPanelStyledProps>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const ReportContentHeader = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  padding: 10px 12px;
  color: ${themeColors.gray10};
`;
const ReportContentRow = styled.div`
  display: flex;
  padding: 10px 22px;
`;
const ReportContentRowText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray10};
`;
const ReportContentRowNumber = styled.span`
  //font-family: "Inter";
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: ${themeColors.gray9};
  margin-left: auto;
`;

interface ReportPanelProps {
  report: ReportDto;
}
export const ReportPanel = (props: ReportPanelProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const onFavIcoClick = () => {
    props.report.tags.includes("favorite")
      ? dispatch(
          reportsActions.removeReportTag({
            id: props.report.id,
            tag: "favorite",
          })
        )
      : dispatch(
          reportsActions.addReportTag({ id: props.report.id, tag: "favorite" })
        );
  };

  const reportError = useAppSelector((store) => store.reports.error);
  useEffect(() => {
    if (reportError)
      openAppNotification({
        message: reportError,
        customClass: "Notification__error",
        icon: null,
      });
    dispatch(reportsActions.clearError());
  }, [reportError]);

  return (
    <>
      <ReportPanelStyled isOpen={isOpen}>
        <img
          onClick={onFavIcoClick}
          src={props.report.tags.includes("favorite") ? favIco : noFavIco}
        />
        <ReportTitle
          isOpen={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {props.report.name}
        </ReportTitle>
        <ReportRightDiv
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {props.report.tags
            .filter((tag) => tag !== "favorite")
            .map((tag) => (
              <Tag color="geekblue" key={tag}>
                {tag}
              </Tag>
            ))}
          <SVG
            src={panelArrow}
            fill={isOpen ? themeColors.blue6 : themeColors.gray8}
            style={
              isOpen
                ? { transform: "rotate(-180deg)", transition: "transform .24s" }
                : { transition: "transform .24s" }
            }
          />
        </ReportRightDiv>
      </ReportPanelStyled>
      <ReportContent isOpen={isOpen}>
        <ReportContentHeader>Банк</ReportContentHeader>
        <ReportContentRow>
          <ReportContentRowText>Бизнес-счет</ReportContentRowText>
          <ReportContentRowNumber>1,602.00</ReportContentRowNumber>
        </ReportContentRow>
      </ReportContent>
    </>
  );
};
