import styled from "styled-components";
import { Palette } from "../../shared/globalStyles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 670px;
  gap: 30px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Text = styled.h2`
  text-align: center;
  font-size: 21px;
  width: 540px;
`;

export const InputTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  user-select: none;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 66px;
  width: 300px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;

export const ErrorText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${Palette.redColor};
  user-select: none;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.5;
  width: 100%;
  height: 90%;
`;
