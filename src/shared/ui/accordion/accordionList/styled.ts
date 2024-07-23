import styled from "styled-components";
import { Palette } from "../../../globalStyles";

export const AccordionWrapper = styled.ul`
  list-style-type: none;
  padding: 16px;
  background-color: #dcdcdc;
  width: 500px;
`;

export const AccordItem = styled.li`
  margin-bottom: 16px;
  background-color: #ffffff;

  .accordion-header {
    position: relative;
    width: 100%;
    padding: 20px 60px 20px 30px;
    background-color: #ffffff;
    border: 0;
    font-size: 22px;
    text-align: left;
    cursor: pointer;
  }

  .accordion-collapse {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    height: 0;
    overflow: hidden;
  }

  .accordion-collapse.open {
    height: auto;
  }

  .accordion-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 25px 0;
    background-color: #f1f1f1;
    font-size: 20px;
  }

  .accordion-body-item {
    padding: 5px 60px 5px 30px;
    cursor: pointer;

    &:hover {
      background-color: #dcdcdc;
    }
  }

  .accordion-body-empty {
    padding: 0px 60px 0px 30px;
  }

  .accordion-add-button {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .accordion-arrow {
    position: absolute;
    top: 50%;
    right: 20px;
    display: block;
    width: 30px;
    height: 17px;
    fill: ${Palette.primaryColor};
    transform: translateY(-50%);
  }

  .accordion-arrow.active {
    transform: translateY(-50%) rotate(180deg);
  }
`;
