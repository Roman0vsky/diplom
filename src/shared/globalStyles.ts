import styled, { createGlobalStyle } from "styled-components";
import { plusImg } from "./imgs";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', Arial, sans-serif;
    transition: 0.12s linear;
  }
  body {
    position: relative;
  }
  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

export const Palette = {
  primaryColor: "#3563E9",
  bgColor: "#F6F7F9",
  borderColor: "#BBBBBB",
  white: "#fff",
  fontSize: "16px",
  fontColor: "#333333",
  lightGrey: "#EAEAEA",
  redColor: "#C70000",
};

export const InputDefault = styled.input<{
  $redBorder?: boolean;
}>`
  font-size: ${Palette.fontSize};
  padding: 11px 20px;
  border-radius: 20px;
  border: ${(props) =>
    props.$redBorder
      ? `1px solid ${Palette.redColor}`
      : `1px solid ${Palette.borderColor}`};
  width: 100%;
`;

export const ButtonDefault = styled.button<{
  $reverse?: boolean;
  $marginTop?: string;
  $width?: string;
  $red?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: ${Palette.fontSize};
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.$reverse
      ? Palette.white
      : props.$red
      ? Palette.redColor
      : Palette.primaryColor};
  color: ${(props) => (props.$reverse ? "#000" : Palette.white)};
  margin-top: ${(props) => (props.$marginTop ? props.$marginTop : "auto")};
  width: ${(props) => (props.$width ? props.$width : "auto")};
  user-select: none;

  &:hover {
    color: ${(props) =>
      props.$reverse ? Palette.primaryColor : Palette.white};
  }

  &:disabled {
    background-color: ${(props) =>
      props.$reverse ? Palette.lightGrey : props.$red ? "#8C0000" : "#2146B5"};
    cursor: not-allowed;
  }
`;

export const TableDefault = styled.table<{
  $width?: string;
  $maxHeight?: string;
}>`
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  word-break: break-word;
  width: ${(props) => (props.$width ? props.$width : "auto")};
  max-height: ${(props) => (props.$maxHeight ? props.$maxHeight : "auto")};
  overflow-y: auto;
`;

export const TheadDefault = styled.thead`
  display: flex;
  & > tr {
    background-color: ${Palette.lightGrey};
    font-weight: 700;
  }

  & > tr > td {
    text-align: center;
  }
`;

export const TbodyDefault = styled.tbody`
  display: flex;
  flex-direction: column;
`;

export const TrDefault = styled.tr<{
  $selected?: boolean;
  $maxWidth?: string;
  $trWithoutHover?: boolean;
  $tdWithoutHover?: boolean;
}>`
  display: flex;
  min-height: 40px;
  width: 100%;
  max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : "auto")};
  &:hover {
    background-color: ${(props) =>
      props.$trWithoutHover ? "none" : Palette.lightGrey};

    & > td {
      background-color: ${(props) =>
        !props.$trWithoutHover || props.$tdWithoutHover
          ? "none"
          : Palette.lightGrey};
    }
  }
  background-color: ${(props) =>
    props.$selected ? Palette.lightGrey : "none"};
`;

export const TdDefault = styled.td<{
  $maxWidth?: string;
  $selected?: boolean;
  $flex?: boolean;
}>`
  ${(props) =>
    props.$flex &&
    `display: flex; justify-content: space-between; align-items: center;`}
  padding: 11.5px 10px;
  border: 1px solid ${Palette.borderColor};
  max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : "auto")};
  width: 100%;
  font-size: 14px;
  user-select: none;
  background-color: ${(props) =>
    props.$selected ? Palette.lightGrey : "none"};
`;

export const PlusButton = styled.button<{ $marginRight?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.primaryColor};
  background-image: url(${plusImg});
  background-repeat: no-repeat;
  background-position: center;
  color: ${Palette.white};
  font-size: 32px;
  font-weight: 100;
  border-radius: 100px;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: ${(props) =>
    props.$marginRight ? props.$marginRight : "none"};
`;

export const ReportWrapper = styled.div`
  max-width: 1300px;
  max-height: 600px;
  overflow: auto;
  & > table {
    width: 100%;
    height: 100%;
  }
`;

export const ReportTable = styled.table``;

export const ReportTHead = styled.thead``;

export const ReportTBody = styled.tbody``;

export const ReportTR = styled.tr<{ $hover?: boolean }>`
  &:hover {
    background: ${(props) => props.$hover && Palette.lightGrey};
    cursor: ${(props) => props.$hover && "pointer"};
  }
`;

export const ReportTD = styled.td<{ $width?: string }>`
  text-align: center;
  min-width: ${(props) => (props.$width ? props.$width : "auto")};
  max-width: ${(props) => (props.$width ? props.$width : "auto")};
`;

export const ReportP = styled.p`
  text-align: center;
  rotate: -90deg;
`;

export default GlobalStyle;
