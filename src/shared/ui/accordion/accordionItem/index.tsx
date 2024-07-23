import ArrowIcon from "../arrow-icon/arrow-icon";
import ICategory from "../../../interfaces/category";
import { PlusButton } from "../../../globalStyles";
import {
  setCurrentCategory,
  setCurrentFavour,
} from "../../../../features/inspector/inspectorSlice";
import { useAppDispatch } from "../../../../app/store/hooks";
import { AccordItem } from "../accordionList/styled";
import IFavour from "../../../interfaces/favour";

interface IProps {
  category: ICategory;
  isOpen: boolean;
  onClick: () => void;
  changeCategoriesFormVisibility: (prop: boolean) => void;
  changeFavorsFormVisibility: (prop: boolean) => void;
  changeCategoryButtonsVisibility: (prop: boolean) => void;
  changeFavourButtonsVisibility: (prop: boolean) => void;
}

export default function AccordionItem({
  category,
  isOpen,
  onClick,
  changeCategoriesFormVisibility,
  changeFavorsFormVisibility,
  changeCategoryButtonsVisibility,
  changeFavourButtonsVisibility,
}: IProps) {
  const dispatch = useAppDispatch();

  function onClickCategoryHandler(category: ICategory) {
    dispatch(setCurrentCategory(category));
    changeFavorsFormVisibility(false);
    changeCategoryButtonsVisibility(true);
    changeCategoriesFormVisibility(true);
  }

  function addFavourHandler(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatch(
      setCurrentFavour({
        id: 0,
        name: "",
        shortName: "",
        categoryId: category.id,
        normDescription: "",
        functionalClasses: [],
      })
    );
    changeFavourButtonsVisibility(false);
    changeFavorsFormVisibility(true);
  }

  function onClickFavourHandler(
    favour: IFavour,
    e: React.MouseEvent<HTMLElement>
  ) {
    e.stopPropagation();
    dispatch(setCurrentFavour(favour));
    changeFavourButtonsVisibility(true);
    changeFavorsFormVisibility(true);
  }

  return (
    <AccordItem
      onClick={() => {
        onClickCategoryHandler(category);
      }}
    >
      <button className="accordion-header" onClick={() => onClick()}>
        {category.name}
        <ArrowIcon classname={`accordion-arrow ${isOpen ? "active" : ""}`} />
      </button>
      <div
        className="accordion-collapse"
        style={isOpen ? { height: "fit-content" } : { height: "0px" }}
      >
        <div className="accordion-body">
          {category.favours.length > 0 ? (
            category.favours.map((favour) => (
              <div
                className="accordion-body-item"
                onClick={(e) => onClickFavourHandler(favour, e)}
              >
                {favour.name}
              </div>
            ))
          ) : (
            <div className="accordion-body-empty">Список пуст</div>
          )}
        </div>
        <PlusButton
          className="accordion-add-button"
          onClick={(e) => {
            addFavourHandler(e);
          }}
        />
      </div>
    </AccordItem>
  );
}
