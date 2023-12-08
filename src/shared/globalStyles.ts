import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', Arial, sans-serif;
    transition: 0.12s linear;
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
};

export const InputDefault = styled.input`
  font-size: ${Palette.fontSize};
  padding: 11px 20px;
  border-radius: 20px;
  border: 1px solid ${Palette.borderColor};
  width: 100%;
`;

export const ButtonDefault = styled.button<{
  $reverse?: boolean;
  $marginTop?: string;
  $width?: string;
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
    props.$reverse ? Palette.white : Palette.primaryColor};
  color: ${(props) => (props.$reverse ? "#000" : Palette.white)};
  margin-top: ${(props) => (props.$marginTop ? props.$marginTop : "auto")};
  width: ${(props) => (props.$width ? props.$width : "auto")};

  &:hover {
    color: ${(props) =>
      props.$reverse ? Palette.primaryColor : Palette.white};
  }
`;

export default GlobalStyle;
