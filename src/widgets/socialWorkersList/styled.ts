import styled from "styled-components";
import { Palette } from "../../shared/globalStyles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 540px;
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

export const ImgContainer = styled.div<{ $visibility?: boolean }>`
  display: ${(props) => (props.$visibility ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  height: 41px;
  width: 41px;
  background-color: ${Palette.white};
`;
