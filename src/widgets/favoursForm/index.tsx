import { useEffect, useState } from "react";
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
  useCreateFavourMutation,
  useUpdateFavourMutation,
  useDeleteFavourMutation,
} from "../../features/inspector/inspectorService";
import PopUp from "../../shared/ui/pop-up";
import LoaderElement from "../../shared/ui/loaderElement";
import CustomCheckbox from "../../shared/ui/customCheckbox";
import FunctionalClassENG from "../../shared/enums/functionalClassENG";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

interface IFormProps {
  id: number;
  name: string;
  shortName: string;
  categoryId: number;
  normDescription: string;
  fc2: boolean;
  fc3: boolean;
  fc4: boolean;
}

export default function FavorsForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const [createFavour, { isLoading: isCreateFavourLoading }] =
    useCreateFavourMutation();
  const [updateFavour, { isLoading: isUpdateFavourLoading }] =
    useUpdateFavourMutation();
  const [deleteFavour, { isLoading: isDeleteFavourLoading }] =
    useDeleteFavourMutation();

  const defaultValues: IFormProps = {
    id: 0,
    name: "",
    shortName: "",
    categoryId: 0,
    normDescription: "",
    fc2: false,
    fc3: false,
    fc4: false,
  };
  const currentFavour = useAppSelector(
    (state) => state.inspector.currentFavour
  );

  const [favour, setFavour] = useState<IFormProps | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormProps>({
    defaultValues,
    values: favour || defaultValues,
  });

  useEffect(() => {
    if (currentFavour && Object.keys(currentFavour).length !== 0) {
      setFavour({
        id: currentFavour.id,
        name: currentFavour.name,
        shortName: currentFavour.shortName,
        categoryId: currentFavour.categoryId,
        normDescription: currentFavour.normDescription,
        fc2: currentFavour.functionalClasses.find(
          (fc) => fc == FunctionalClassENG.FC2
        )
          ? true
          : false,
        fc3: currentFavour.functionalClasses.find(
          (fc) => fc == FunctionalClassENG.FC3
        )
          ? true
          : false,
        fc4: currentFavour.functionalClasses.find(
          (fc) => fc == FunctionalClassENG.FC4
        )
          ? true
          : false,
      });
    }
  }, [currentFavour]);

  useEffect(() => {
    favour && reset(favour);
  }, [favour]);

  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    const funcClasses = [];
    data.fc2 && funcClasses.push(FunctionalClassENG.FC2);
    data.fc3 && funcClasses.push(FunctionalClassENG.FC3);
    data.fc4 && funcClasses.push(FunctionalClassENG.FC4);
    if (isButtonsVisible) {
      try {
        await updateFavour({
          id: data.id,
          name: data.name,
          shortName: data.shortName,
          categoryId: data.categoryId,
          normDescription: data.normDescription,
          functionalClasses: funcClasses,
        });
        changeFormVisibility(false);
      } catch (e) {
        console.log("favoursForm > saveError", e);
      }
    } else {
      try {
        await createFavour({
          name: data.name,
          shortName: data.shortName,
          categoryId: data.categoryId,
          normDescription: data.normDescription,
          functionalClasses: funcClasses,
        });
        changeFormVisibility(false);
      } catch (e) {
        console.log("favoursForm > saveError", e);
      }
    }
    reset();
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
  }

  return (
    <>
      {isFormVisible && currentFavour ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>Изменение данных услуги</h2>
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
            <InputContainer>
              {errors.normDescription?.message ? (
                <ErrorText>{errors.normDescription.message}:</ErrorText>
              ) : (
                <InputTitle>Нормы предоставления услуг:</InputTitle>
              )}
              <InputDefault
                {...register("normDescription", {
                  required: {
                    value: true,
                    message: "Введите нормы предоставления услуг",
                  },
                })}
                placeholder="Нормы предоставления услуг"
                $redBorder={!!errors.normDescription?.message}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer $height="auto">
              <CustomCheckbox
                registerProps={{
                  ...register("fc2"),
                }}
                question="ФК 2"
                name="fc2"
              />
              <CustomCheckbox
                registerProps={{
                  ...register("fc3"),
                }}
                question="ФК 3"
                name="fc3"
              />
              <CustomCheckbox
                registerProps={{
                  ...register("fc4"),
                }}
                question="ФК 4"
                name="fc4"
              />
            </InputContainer>
            <ButtonContainer>
              <ButtonDefault key="favoursFormButton1">Сохранить</ButtonDefault>
              {isButtonsVisible && (
                <ButtonDefault
                  key="favoursFormButton4"
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
          text={`Вы действительно хотите удалить услугу ${currentFavour?.shortName}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteFavour(currentFavour!.id);
          }}
        />
      )}
      {isCreateFavourLoading ||
      isUpdateFavourLoading ||
      isDeleteFavourLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
