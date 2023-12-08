import styled from "styled-components";
import { Palette } from "../../shared/globalStyles";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Palette.borderColor};
  height: fit-content;
`;

export const Worker = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  min-height: 40px;
  padding: 12px 10px;

  &:nth-child(even) {
    background-color: ${Palette.lightGrey};
    border: 1px solid ${Palette.borderColor};
    border-left: 0;
    border-right: 0;
  }
`;

export const WorkerName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${Palette.fontSize};
  color: ${Palette.fontColor};
`;
export const WorkerCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${Palette.fontSize};
  color: ${Palette.fontColor};
`;
