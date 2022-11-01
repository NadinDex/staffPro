import styled from "styled-components";
import { themeColors } from "../../themeColors";
import React, { useState } from "react";
import { ReportCategoryDto, ReportDto } from "../../Dto/reportsDto";
import favIco from "../../Asserts/Icons/favIco.svg";
import noFavIco from "../../Asserts/Icons/favNoIco.svg";
import panelArrow from "../../Asserts/Icons/panelArrow.svg";
import { Tag } from "antd";
import SVG from "react-inlinesvg";
import { OmitProps } from "antd/lib/transfer/ListBody";

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
  return (
    <>
      <ReportPanelStyled
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          src={props.report.tags.includes("favorite") ? favIco : noFavIco}
          onClick={() => {
            console.log("Have to change favorite state");
          }}
        />
        <ReportTitle isOpen={isOpen}>{props.report.name}</ReportTitle>
        <ReportRightDiv>
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
            rotate={isOpen ? 180 : 0}
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
