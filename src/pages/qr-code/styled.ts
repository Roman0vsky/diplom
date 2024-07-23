import styled from "styled-components";
import { ButtonDefault, Palette } from "../../shared/globalStyles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 48px;
  margin-top: 30px;
`;

export const Text = styled.p`
  font-size: ${Palette.fontSize};
  margin-top: 30px;
`;

export const QRCodeBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 400px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;
export const Code = styled.h1`
  margin-top: 30px;
  letter-spacing: 10px;
  font-size: 64px;
  min-height: 80px;
`;

export const Button = styled(ButtonDefault)`
  font-size: 24px;
  margin-top: 30px;
`;
