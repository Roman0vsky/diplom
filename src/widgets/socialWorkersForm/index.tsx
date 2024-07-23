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
import Post from "../../shared/enums/post";
import ISocialWorker from "../../shared/interfaces/socialWorker";
import { useNavigate } from "react-router";
import PopUp from "../../shared/ui/pop-up";
import {
  useCreateSocialWorkerMutation,
  useDeleteSocialWorkerMutation,
  useUpdateSocialWorkerMutation,
} from "../../features/inspector/inspectorService";
import LoaderElement from "../../shared/ui/loaderElement";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

export default function SocialWorkersForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const defaultValues = {
    lastName: "",
    firstName: "",
    middleName: "",
    id: 0,
    workerId: 0,
    inspectorId: 0,
    post: Post.SOCIAL_WORKER,
    latitude: 0,
    longitude: 0,
  };
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const currentSocialWorker = useAppSelector(
    (state) => state.inspector.currentSocialWorker
  );
  const navigate = useNavigate();
  const [createSocialWorker, { isLoading: isCreateSocialWorkerLoading }] =
    useCreateSocialWorkerMutation();
  const [updateSocialWorker, { isLoading: isUpdateSocialWorkerLoading }] =
    useUpdateSocialWorkerMutation();
  const [deleteSocialWorker, { isLoading: isDeleteSocialWorkerLoading }] =
    useDeleteSocialWorkerMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISocialWorker>({
    defaultValues,
    values: currentSocialWorker || defaultValues,
  });

  const onSubmit: SubmitHandler<ISocialWorker> = async (data) => {
    if (isButtonsVisible) {
      try {
        await updateSocialWorker(data);
        changeFormVisibility(false);
      } catch (e) {
        console.log("socialWorkersForm > saveError", e);
      }
    } else {
      try {
        await createSocialWorker(data);
        changeFormVisibility(false);
      } catch (e) {
        console.log("socialWorkersForm > saveError", e);
      }
    }
    reset();
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
  }

  function connectDevice() {
    navigate("/qr-code");
  }

  return (
    <>
      {isFormVisible && currentSocialWorker ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>
              Изменение данных соц. работника
            </h2>
            <InputContainer>
              {errors.lastName?.message ? (
                <ErrorText>{errors.lastName.message}:</ErrorText>
              ) : (
                <InputTitle>Фамилия:</InputTitle>
              )}
              <InputDefault
                {...register("lastName", {
                  required: { value: true, message: "Введите фамилию" },
                })}
                placeholder="Фамилия"
                $redBorder={!!errors.lastName?.message}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              {errors.firstName?.message ? (
                <ErrorText>{errors.firstName.message}:</ErrorText>
              ) : (
                <InputTitle>Имя:</InputTitle>
              )}
              <InputDefault
                {...register("firstName", {
                  required: { value: true, message: "Введите имя" },
                })}
                placeholder="Имя"
                $redBorder={!!errors.firstName?.message}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              {errors.middleName?.message ? (
                <ErrorText>{errors.middleName.message}:</ErrorText>
              ) : (
                <InputTitle>Отчество:</InputTitle>
              )}
              <InputDefault
                {...register("middleName", {
                  required: { value: true, message: "Введите отчество" },
                })}
                placeholder="Отчество"
                $redBorder={!!errors.middleName?.message}
                autoComplete="off"
              />
            </InputContainer>
            <ButtonContainer>
              <ButtonDefault key="socialWorkersButton1">
                Сохранить
              </ButtonDefault>
              {isButtonsVisible && (
                <ButtonDefault
                  key="socialWorkersButton2"
                  type="button"
                  onClick={() => {
                    connectDevice();
                  }}
                >
                  Подключить устройство
                </ButtonDefault>
              )}
              {isButtonsVisible && (
                <ButtonDefault
                  $red
                  key="socialWorkersButton3"
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
          text={`Вы действительно хотите удалить соц. работника ${currentSocialWorker?.lastName} ${currentSocialWorker?.firstName} ${currentSocialWorker?.middleName}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteSocialWorker(+currentSocialWorker!.workerId);
          }}
        />
      )}
      {isCreateSocialWorkerLoading ||
      isUpdateSocialWorkerLoading ||
      isDeleteSocialWorkerLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
