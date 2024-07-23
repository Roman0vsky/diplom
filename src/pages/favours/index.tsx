import { useState } from "react";
import { Wrapper } from "./styled";
import CategoriesList from "../../widgets/categoriesList";
import FavoursForm from "../../widgets/favoursForm";
import CategoriesForm from "../../widgets/categoriesForm";

export default function Favours() {
  const [isCategoriesFormVisible, setCategoriesFormVisibility] =
    useState<boolean>(false);
  const [isFavorsFormVisible, setFavorsFormVisibility] =
    useState<boolean>(false);
  const [isCategoryButtonsVisible, setCategoryButtonsVisibility] =
    useState<boolean>(false);
  const [isFavourButtonsVisible, setFavourButtonsVisibility] =
    useState<boolean>(false);

  function changeCategoriesFormVisibility(prop: boolean) {
    setCategoriesFormVisibility(prop);
  }

  function changeFavorsFormVisibility(prop: boolean) {
    setFavorsFormVisibility(prop);
  }

  function changeCategoryButtonsVisibility(prop: boolean) {
    setCategoryButtonsVisibility(prop);
  }

  function changeFavourButtonsVisibility(prop: boolean) {
    setFavourButtonsVisibility(prop);
  }
  return (
    <Wrapper>
      <CategoriesList
        changeCategoriesFormVisibility={changeCategoriesFormVisibility}
        changeFavorsFormVisibility={changeFavorsFormVisibility}
        changeCategoryButtonsVisibility={changeCategoryButtonsVisibility}
        changeFavourButtonsVisibility={changeFavourButtonsVisibility}
      />
      <CategoriesForm
        isFormVisible={isCategoriesFormVisible}
        isButtonsVisible={isCategoryButtonsVisible}
        changeFormVisibility={changeCategoriesFormVisibility}
      />
      <FavoursForm
        isFormVisible={isFavorsFormVisible}
        isButtonsVisible={isFavourButtonsVisible}
        changeFormVisibility={changeFavorsFormVisibility}
      />
    </Wrapper>
  );
}
