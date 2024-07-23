import {
  ErrorText,
  Form,
  InputContainer,
  InputTitle,
  LoaderContainer,
  Text,
  TextContainer,
  Wrapper,
} from "./styled";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import FunctionalClassRUS from "../../shared/enums/functionalClassRUS";
import {
  TableDefault,
  TheadDefault,
  TrDefault,
  TdDefault,
  TbodyDefault,
  ButtonDefault,
  InputDefault,
} from "../../shared/globalStyles";
import LoaderElement from "../../shared/ui/loaderElement";
import { SubmitHandler, useForm } from "react-hook-form";
import { Title } from "../profile/styled";
import {
  useCreateNurseMutation,
  useDeleteNurseMutation,
  useGetNursesQuery,
} from "../../features/inspector/inspectorService";
import { useEffect, useState } from "react";
import { setNurses } from "../../features/inspector/inspectorSlice";
import PopUp from "../../shared/ui/pop-up";
import INurse from "../../shared/interfaces/nurse";
import mockNurses from "../../shared/mock/nurses";

interface IFormInput {
  date: string | Date;
}

export default function Nurse() {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const [currentNurse, setCurrentNurse] = useState<INurse | null>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentClient = useAppSelector(
    (state) => state.inspector.currentClient
  );
  const nurses = useAppSelector((state) => state.inspector.nurses);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const {
    data: getNursesData,
    isSuccess: isGetNursesSuccess,
    isFetching: isGetNursesFetching,
    refetch: refetchNurses,
  } = useGetNursesQuery(currentClient!.id);
  const [createNurse, { isLoading: isCreateNurseLoading }] =
    useCreateNurseMutation();
  const [deleteNurse, { isLoading: isDeleteNurseLoading }] =
    useDeleteNurseMutation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const [month, year] = data.date.toString().split(".");
    const finallyDate = new Date();
    finallyDate.setFullYear(+year, +month - 1);
    try {
      await createNurse({ clientId: currentClient!.id, month: finallyDate });
    } catch (e) {
      console.log("nurseForm > saveError", e);
    }
    reset();
  };

  useEffect(() => {
    if (isGetNursesSuccess && !isGetNursesFetching) {
      dispatch(setNurses(getNursesData));
    } else {
      dispatch(setNurses(mockNurses));
    }
  }, [isGetNursesSuccess, isGetNursesFetching]);

  function handleGoBack() {
    navigate("/clients");
  }

  function handleDeleteButton(nurse: INurse) {
    setCurrentNurse(nurse);
    setPopUpVisibility(true);
  }

  let key = 1;

  return (
    <Wrapper>
      <TableDefault $width="780px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault>
            <TdDefault $maxWidth="300px">Ф. И. О.</TdDefault>
            <TdDefault $maxWidth="210px">Адрес</TdDefault>
            <TdDefault $maxWidth="60px">ФК</TdDefault>
            <TdDefault $maxWidth="210px">Участок</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          <TrDefault key={"client"} $trWithoutHover $tdWithoutHover>
            <TdDefault $maxWidth="300px">
              {currentClient?.lastName} {currentClient?.firstName}{" "}
              {currentClient?.middleName}
            </TdDefault>
            <TdDefault $maxWidth="210px">{currentClient?.address}</TdDefault>
            <TdDefault $maxWidth="60px">
              {
                FunctionalClassRUS[
                  currentClient?.functionalClass as keyof typeof FunctionalClassRUS
                ]
              }
            </TdDefault>
            <TdDefault $maxWidth="210px">
              {currentClient?.region.name}
            </TdDefault>
          </TrDefault>
        </TbodyDefault>
      </TableDefault>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Назначить сиделку</Title>
        <InputContainer>
          {errors.date?.message ? (
            <ErrorText>{errors.date.message}:</ErrorText>
          ) : (
            <InputTitle>Месяц и год:</InputTitle>
          )}
          <InputDefault
            {...register("date", {
              required: { value: true, message: "Введите месяц и год" },
              pattern: {
                value: /^(0[1-9]|1[0-2])\.(\d{4})$/,
                message: "Формат строго ММ.ГГГГ (например, 05.1995)",
              },
            })}
            placeholder="Месяц и год"
            $redBorder={!!errors.date?.message}
            autoComplete="off"
          />
        </InputContainer>
        {isCreateNurseLoading ? (
          <LoaderElement />
        ) : (
          <ButtonDefault $width="110px" onClick={handleSubmit(onSubmit)}>
            Добавить
          </ButtonDefault>
        )}
      </Form>

      <ButtonDefault onClick={handleGoBack}>Назад</ButtonDefault>

      {isGetNursesFetching ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : nurses && nurses?.length > 0 ? (
        <TableDefault $width="300px" $maxHeight="698px">
          <TheadDefault>
            <TrDefault $maxWidth="300px">
              <TdDefault $maxWidth="300px">Месяц</TdDefault>
            </TrDefault>
          </TheadDefault>
          <TbodyDefault>
            {...nurses.map((nurse) => (
              <TrDefault $trWithoutHover $tdWithoutHover key={"nurse" + key++}>
                <TdDefault $maxWidth="300px" $flex>
                  {new Date(nurse.month).getFullYear()},{" "}
                  {months[new Date(nurse.month).getMonth()]}
                  <ButtonDefault
                    $red
                    onClick={() => {
                      handleDeleteButton(nurse);
                    }}
                  >
                    Удалить
                  </ButtonDefault>
                </TdDefault>
              </TrDefault>
            ))}
          </TbodyDefault>
        </TableDefault>
      ) : isGetNursesSuccess && nurses ? (
        <Text>Список пуст</Text>
      ) : (
        <TextContainer>
          <Text>Ошибка получения данных</Text>
          <ButtonDefault
            $width="120px"
            onClick={() => {
              refetchNurses();
            }}
          >
            Обновить
          </ButtonDefault>
        </TextContainer>
      )}
      {isPopUpVisible && (
        <PopUp
          text={`Вы действительно хотите удалить запись ${new Date(
            currentNurse!.month
          ).getFullYear()}, ${
            months[new Date(currentNurse!.month).getMonth()]
          }`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          submitFunction={async () => {
            await deleteNurse(currentNurse!.id);
          }}
        />
      )}
      {isGetNursesFetching || isDeleteNurseLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}
