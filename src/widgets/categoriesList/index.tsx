import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import {
  setCategories,
  setCurrentCategory,
} from "../../features/inspector/inspectorSlice";
import { ButtonDefault, PlusButton } from "../../shared/globalStyles";
import { LoaderContainer, Text, TextContainer, Wrapper } from "./styled";
import LoaderElement from "../../shared/ui/loaderElement";
import { useGetCategoriesQuery } from "../../features/inspector/inspectorService";
// import mockCategories from "../../shared/mock/categories";
import Accordion from "../../shared/ui/accordion/accordionList";

interface IProps {
  changeCategoriesFormVisibility: (prop: boolean) => void;
  changeFavorsFormVisibility: (prop: boolean) => void;
  changeCategoryButtonsVisibility: (prop: boolean) => void;
  changeFavourButtonsVisibility: (prop: boolean) => void;
}

export default function CaregoriesList({
  changeCategoriesFormVisibility,
  changeFavorsFormVisibility,
  changeCategoryButtonsVisibility,
  changeFavourButtonsVisibility,
}: IProps) {
  const dispatch = useAppDispatch();
  const {
    data: getCategoriesData,
    isSuccess: isGetCategoriesSuccess,
    isLoading: isGetCategoriesLoading,
    isFetching: isGetCategoriesFetching,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();
  const categories = useAppSelector((state) => state.inspector.categories);

  useEffect(() => {
    if (isGetCategoriesSuccess && !isGetCategoriesFetching) {
      dispatch(setCategories(getCategoriesData));
      changeCategoriesFormVisibility(false);
      changeFavorsFormVisibility(false);
      changeCategoryButtonsVisibility(false);
      changeFavourButtonsVisibility(false);
    }
    // else {
    //   dispatch(setCategories(mockCategories));
    //   changeCategoriesFormVisibility(false);
    //   changeFavorsFormVisibility(false);
    //   changeCategoryButtonsVisibility(false);
    //   changeFavourButtonsVisibility(false);
    // }
  }, [isGetCategoriesSuccess, isGetCategoriesFetching]);

  function addCategoryHandler() {
    dispatch(
      setCurrentCategory({
        id: 0,
        name: "",
        shortName: "",
        favours: [],
      })
    );
    changeCategoryButtonsVisibility(false);
    changeCategoriesFormVisibility(true);
  }

  return isGetCategoriesLoading || isGetCategoriesFetching ? (
    <LoaderContainer>
      <LoaderElement />
    </LoaderContainer>
  ) : categories && categories.length > 0 ? (
    <Wrapper>
      <Accordion
        changeCategoryButtonsVisibility={changeCategoryButtonsVisibility}
        changeFavourButtonsVisibility={changeFavourButtonsVisibility}
        changeCategoriesFormVisibility={changeCategoriesFormVisibility}
        changeFavorsFormVisibility={changeFavorsFormVisibility}
        categories={categories}
      />
      <PlusButton onClick={addCategoryHandler} />
    </Wrapper>
  ) : categories && isGetCategoriesSuccess ? (
    <Wrapper>
      <Text>Список категорий пуст</Text>
      <PlusButton onClick={addCategoryHandler} />
    </Wrapper>
  ) : (
    <Wrapper>
      <TextContainer>
        <Text>Ошибка получения данных</Text>
        <ButtonDefault
          $width="120px"
          onClick={() => {
            refetchCategories();
          }}
        >
          Обновить
        </ButtonDefault>
      </TextContainer>
    </Wrapper>
  );
}
