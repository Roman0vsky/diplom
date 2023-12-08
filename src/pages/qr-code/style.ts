import styled from "styled-components";
import { ButtonDefault, Palette } from "../../shared/globalStyles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 48px;
  margin: 50px 0;
`;

export const Text = styled.p`
  font-size: ${Palette.fontSize};
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

export const Button = styled(ButtonDefault)`
  font-size: 24px;
  margin-top: 50px;
`;
