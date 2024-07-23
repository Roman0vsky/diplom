import styled from "styled-components";
import { InputDefault, Palette } from "../../shared/globalStyles";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  /* height: 380px; */
  min-height: 340px;
  height: 100%;
  margin: 200px auto 0;
  padding: 30px;
  color: ${Palette.white};
  background-color: ${Palette.primaryColor};
  border-radius: 20px;

  .link {
    position: relative;
    color: ${Palette.white};
    font-size: ${Palette.fontSize};
    margin-top: 25px;
    text-decoration: none;

    &::after {
      position: absolute;
      content: "";
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${Palette.white};
      scale: 0;
      transition: 0.3s ease-in;
    }
    &:hover:after {
      scale: 1;
      transition: 0.3s ease-in;
    }
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 30px;
  user-select: none;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  height: 72px;
`;

export const InputField = styled(InputDefault)<{ $borderRed?: boolean }>`
  width: 300px;
  ${(props) =>
    props.$borderRed &&
    `
      border-color: red;
      border-width: 3px;
    `};
`;

export const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
