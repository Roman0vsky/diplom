import styled from "styled-components";
import { Palette } from "../../shared/globalStyles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 30px;
`;

export const Title = styled.h1`
  font-size: 24px;
  user-select: none;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 66px;
  width: 100%;
  gap: 5px;
`;

export const InfoTitle = styled.p`
  font-size: ${Palette.fontSize};
  font-weight: bold;
  user-select: none;
  margin-bottom: 10px;
`;

export const InfoText = styled.div`
  font-size: ${Palette.fontSize};
  padding: 11px 20px;
  border-radius: 20px;
  border: 1px solid ${Palette.borderColor};
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 670px;
  gap: 30px;
`;

export const InputTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  user-select: none;
`;

export const InputContainer = styled.div<{ $height?: string }>`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.$height ? props.$height : "66px")};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
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
