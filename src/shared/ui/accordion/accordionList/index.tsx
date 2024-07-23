import { useState } from "react";
import ICategory from "../../../interfaces/category";
import AccordionItem from "../accordionItem";
import { AccordionWrapper } from "./styled";

interface IProps {
  categories: ICategory[];
  changeCategoriesFormVisibility: (prop: boolean) => void;
  changeFavorsFormVisibility: (prop: boolean) => void;
  changeCategoryButtonsVisibility: (prop: boolean) => void;
  changeFavourButtonsVisibility: (prop: boolean) => void;
}

export default function Accordion({
  categories,
  changeCategoriesFormVisibility,
  changeFavorsFormVisibility,
  changeCategoryButtonsVisibility,
  changeFavourButtonsVisibility,
}: IProps) {
  const [openId, setId] = useState<null | number>(null);

  return (
    <AccordionWrapper>
      {categories.map((item, id) => (
        <AccordionItem
          onClick={() => (id === openId ? setId(null) : setId(id))}
          category={item}
          isOpen={id === openId}
          key={`accordion${id}`}
          changeCategoryButtonsVisibility={changeCategoryButtonsVisibility}
          changeFavourButtonsVisibility={changeFavourButtonsVisibility}
          changeCategoriesFormVisibility={changeCategoriesFormVisibility}
          changeFavorsFormVisibility={changeFavorsFormVisibility}
        />
      ))}
    </AccordionWrapper>
  );
}
