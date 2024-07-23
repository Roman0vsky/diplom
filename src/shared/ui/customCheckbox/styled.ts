import styled from "styled-components";
import { Palette } from "../../globalStyles";

export const Wrapper = styled.div<{ $marginBottom?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${(props) =>
    props.$marginBottom ? props.$marginBottom : "30px"};
`;

export const Input = styled.input<{
  $redBorder?: boolean;
}>`
  display: flex;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border: ${(props) =>
    props.$redBorder
      ? `1px solid ${Palette.redColor}`
      : `1px solid ${Palette.borderColor}`};
  user-select: none;
`;

export const Question = styled.label`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
`;
