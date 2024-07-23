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
import PopUp from "../../shared/ui/pop-up";
import LoaderElement from "../../shared/ui/loaderElement";
import IRegion from "../../shared/interfaces/region";
import {
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} from "../../features/admin/adminService";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

export default function RegionsForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const defaultValues = { id: 0, name: "" };
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const currentRegion = useAppSelector((state) => state.admin.currentRegion);
  const [createRegion, { isLoading: isCreateRegionLoading }] =
    useCreateRegionMutation();
  const [updateRegion, { isLoading: isUpdateRegionLoading }] =
    useUpdateRegionMutation();
  const [deleteRegion, { isLoading: isDeleteRegionLoading }] =
    useDeleteRegionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegion>({
    defaultValues,
    values: currentRegion || defaultValues,
  });

  const onSubmit: SubmitHandler<IRegion> = async (data) => {
    if (isButtonsVisible) {
      try {
        await updateRegion(data);
        changeFormVisibility(false);
      } catch (e) {
        console.log(`regionsForm > saveError: ${e}`);
      }
    } else {
      try {
        await createRegion(data.name);
        changeFormVisibility(false);
      } catch (e) {
        console.log(`regionsForm > saveError: ${e}`);
      }
    }
    reset();
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
  }

  return (
    <>
      {isFormVisible && currentRegion ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>Изменение данных региона</h2>
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
            <ButtonContainer>
              <ButtonDefault key="regionsButton1">Сохранить</ButtonDefault>
              {isButtonsVisible && (
                <ButtonDefault
                  $red
                  key="regionsButton3"
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
          text={`Вы действительно хотите удалить регион ${currentRegion?.name}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteRegion(+currentRegion!.id);
          }}
        />
      )}
      {isCreateRegionLoading ||
      isUpdateRegionLoading ||
      isDeleteRegionLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
