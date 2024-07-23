import { useState } from "react";
import { useAppSelector } from "../../app/store/hooks";
import { ButtonDefault, InputDefault } from "../../shared/globalStyles";
import {
  ButtonContainer,
  ErrorText,
  Form,
  InputContainer,
  InputTitle,
  LoaderContainer,
  Wrapper,
} from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../features/inspector/inspectorService";
import PopUp from "../../shared/ui/pop-up";
import LoaderElement from "../../shared/ui/loaderElement";
import ICategory from "../../shared/interfaces/category";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

export default function CategoriesForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const [createCategory, { isLoading: isCreateCategoryLoading }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdateCategoryLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleteCategoryLoading }] =
    useDeleteCategoryMutation();

  const defaultValues: ICategory = {
    id: 0,
    name: "",
    shortName: "",
    favours: [],
  };
  const currentCategory = useAppSelector(
    (state) => state.inspector.currentCategory
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({
    defaultValues,
    values: currentCategory || defaultValues,
  });

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    if (isButtonsVisible) {
      try {
        await updateCategory({
          id: data.id,
          name: data.name,
          shortName: data.shortName,
        });
        changeFormVisibility(false);
      } catch (e) {
        console.log("categoriesForm > saveError", e);
      }
    } else {
      try {
        await createCategory({
          name: data.name,
          shortName: data.shortName,
        });
        changeFormVisibility(false);
      } catch (e) {
        console.log("categoriesForm > saveError", e);
      }
    }
    reset();
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
  }

  return (
    <>
      {isFormVisible && currentCategory ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>Изменение данных категории</h2>
            <InputContainer>
              {errors.name?.message ? (
                <ErrorText>{errors.name.message}:</ErrorText>
              ) : (
                <InputTitle>Название:</InputTitle>
              )}
              <InputDefault
                {...register("name", {
                  required: { value: true, message: "Введите название" },
                })}
                placeholder="Название"
                $redBorder={!!errors.name?.message}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              {errors.shortName?.message ? (
                <ErrorText>{errors.shortName.message}:</ErrorText>
              ) : (
                <InputTitle>Краткое название:</InputTitle>
              )}
              <InputDefault
                {...register("shortName", {
                  required: {
                    value: true,
                    message: "Введите краткое название",
                  },
                })}
                placeholder="Краткое название"
                $redBorder={!!errors.shortName?.message}
                autoComplete="off"
              />
            </InputContainer>
            <ButtonContainer>
              <ButtonDefault key="categoriesFormButton1">
                Сохранить
              </ButtonDefault>
              {isButtonsVisible && (
                <ButtonDefault
                  key="categoriesFormButton4"
                  $red
                  type="button"
                  onClick={handleDeleteButton}
                >
                  Удалить
                </ButtonDefault>
              )}
            </ButtonContainer>
          </Form>
        </Wrapper>
      ) : (
        <Wrapper />
      )}
      {isPopUpVisible && (
        <PopUp
          text={`Вы действительно хотите удалить категорию ${currentCategory?.shortName}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteCategory(currentCategory!.id);
          }}
        />
      )}
      {isCreateCategoryLoading ||
      isUpdateCategoryLoading ||
      isDeleteCategoryLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
