import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import FunctionalClass from "../../shared/enums/functionalClassENG";
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
import { setCurrentClient } from "../../features/inspector/inspectorSlice";
import {
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "../../features/inspector/inspectorService";
import PopUp from "../../shared/ui/pop-up";
import LoaderElement from "../../shared/ui/loaderElement";
import CustomSelect from "../../shared/ui/customSelect";
import CustomCheckbox from "../../shared/ui/customCheckbox";
import IClientForm from "../../shared/interfaces/clientForm";
import { useNavigate } from "react-router";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

export default function ClientsForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const [createClient, { isLoading: isCreateClientLoading }] =
    useCreateClientMutation();
  const [updateClient, { isLoading: isUpdateClientLoading }] =
    useUpdateClientMutation();
  const [deleteClient, { isLoading: isDeleteClientLoading }] =
    useDeleteClientMutation();

  const defaultValues: IClientForm = {
    address: "",
    firstName: "",
    functionalClass: "",
    lastName: "",
    middleName: "",
    id: 0,
    gpwVeteran: false,
    warVictim: false,
    lonelyInvalid: false,
    lonelyOldPerson: false,
    cottage: false,
    region: {
      id: 0,
      name: "",
    },
    regionId: 0,
  };
  const currentClient = useAppSelector(
    (state) => state.inspector.currentClient
  );
  const regions = useAppSelector((state) => state.admin.regions);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IClientForm>({
    defaultValues,
    values: currentClient || defaultValues,
  });

  const functionalClasses = Object.values(FunctionalClass);

  const [client, setClient] = useState<IClientForm | null>(null);

  const onSubmit: SubmitHandler<IClientForm> = async (data) => {
    if (isButtonsVisible) {
      try {
        await updateClient({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          address: data.address,
          functionalClass: data.functionalClass,
          regionId: data.region.id,
          gpwVeteran: data.gpwVeteran ?? false,
          warVictim: data.warVictim ?? false,
          lonelyInvalid: data.lonelyInvalid ?? false,
          lonelyOldPerson: data.lonelyOldPerson ?? false,
          cottage: data.cottage ?? false,
          id: data.id,
        });
        changeFormVisibility(false);
      } catch (e) {
        console.log("clientsForm > saveError", e);
      }
    } else {
      try {
        await createClient({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          address: data.address,
          functionalClass: data.functionalClass,
          regionId: data.region.id,
          gpwVeteran: data.gpwVeteran ?? false,
          warVictim: data.warVictim ?? false,
          lonelyInvalid: data.lonelyInvalid ?? false,
          lonelyOldPerson: data.lonelyOldPerson ?? false,
          cottage: data.cottage ?? false,
        });
        changeFormVisibility(false);
      } catch (e) {
        console.log("clientsForm > saveError", e);
      }
    }
    reset();
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
  }

  function handleAssignButton() {
    navigate("/assigned-social-worker");
  }

  function handleNurseButton() {
    navigate("/nurse");
  }

  function handleSelect(prop: any) {
    dispatch(setCurrentClient({ ...client, ...prop }));
  }

  useEffect(() => {
    if (currentClient) {
      setClient(currentClient);
    }
  }, [currentClient]);

  return (
    <>
      {isFormVisible && client ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>Изменение данных подопечного</h2>
            <InputContainer>
              {errors.lastName?.message ? (
                <ErrorText>{errors.lastName.message}:</ErrorText>
              ) : (
                <InputTitle>Фамилия:</InputTitle>
              )}
              <InputDefault
                {...register("lastName", {
                  required: { value: true, message: "Введите фамилию" },
                  onChange: (e) => handleSelect({ lastName: e.target.value }),
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
                  onChange: (e) => handleSelect({ firstName: e.target.value }),
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
                  onChange: (e) => handleSelect({ middleName: e.target.value }),
                })}
                placeholder="Отчество"
                $redBorder={!!errors.middleName?.message}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              {errors.address?.message ? (
                <ErrorText>{errors.address.message}:</ErrorText>
              ) : (
                <InputTitle>Адрес:</InputTitle>
              )}
              <InputDefault
                {...register("address", {
                  required: { value: true, message: "Введите адрес" },
                  onChange: (e) => handleSelect({ address: e.target.value }),
                })}
                placeholder="Адрес"
                $redBorder={!!errors.address?.message}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              {errors.functionalClass?.message ? (
                <ErrorText>{errors.functionalClass.message}:</ErrorText>
              ) : (
                <InputTitle>Функциональный класс:</InputTitle>
              )}
              <CustomSelect
                items={functionalClasses}
                registerProps={{
                  ...register("functionalClass", {
                    required: {
                      value: true,
                      message: "Выберите функциональный класс",
                    },
                    minLength: 1,
                  }),
                }}
                placeholder="Функциональный класс"
                name="functionalClass"
                isError={!!errors.functionalClass?.message}
                handleSelect={handleSelect}
              />
            </InputContainer>
            <InputContainer>
              {errors.region?.name?.message ? (
                <ErrorText>{errors.region?.name?.message}:</ErrorText>
              ) : (
                <InputTitle>Регион:</InputTitle>
              )}
              <CustomSelect
                regions={regions}
                registerProps={{
                  ...register("region.name", {
                    required: {
                      value: true,
                      message: "Выберите регион",
                    },
                    minLength: 1,
                  }),
                }}
                placeholder="Регион"
                name="region"
                isError={!!errors.region?.name?.message}
                handleSelect={handleSelect}
              />
            </InputContainer>
            <InputContainer $height="auto">
              <CustomCheckbox
                registerProps={{
                  ...register("gpwVeteran"),
                }}
                question="Является ли ветераном Великой Отечественной Войны?"
                name="gpwVeteran"
              />
              <CustomCheckbox
                registerProps={{
                  ...register("warVictim"),
                }}
                question="Является ли пострадавшим от последствий войн?"
                name="warVictim"
              />
              <CustomCheckbox
                registerProps={{
                  ...register("lonelyInvalid"),
                }}
                question="Является ли одиноко проживающим инвалидом 1-ой или 2-ой группы?"
                name="lonelyInvalid"
              />
              <CustomCheckbox
                registerProps={{
                  ...register("lonelyOldPerson"),
                }}
                question="Является ли одиноко проживающим пожилым?"
                name="lonelyOldPerson"
              />
              <CustomCheckbox
                registerProps={{
                  ...register("cottage"),
                }}
                question="Проживает ли в частном доме?"
                name="cottage"
                marginBottom="none"
              />
            </InputContainer>
            <ButtonContainer>
              <ButtonDefault key="clientsFormButton1">Сохранить</ButtonDefault>
              {isButtonsVisible && (
                <ButtonDefault
                  key="clientsFormButton2"
                  type="button"
                  onClick={handleAssignButton}
                >
                  Закреплённый соц. работник
                </ButtonDefault>
              )}
              {isButtonsVisible && (
                <ButtonDefault
                  key="clientsFormButton3"
                  type="button"
                  onClick={handleNurseButton}
                >
                  Услуги сиделки
                </ButtonDefault>
              )}
              {isButtonsVisible && (
                <ButtonDefault
                  key="clientsFormButton4"
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
          text={`Вы действительно хотите удалить подопечного ${client?.lastName} ${client?.firstName} ${client?.middleName}, проживающего по адресу ${client?.address}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteClient(client!.id);
          }}
        />
      )}
      {isCreateClientLoading ||
      isUpdateClientLoading ||
      isDeleteClientLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
