import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
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
import PopUp from "../../shared/ui/pop-up";
import LoaderElement from "../../shared/ui/loaderElement";
import {
  useCreateInspectorMutation,
  useDeleteInspectorMutation,
  useGetRegionsQuery,
  useUpdateInspectorMutation,
} from "../../features/admin/adminService";
import IInspector from "../../shared/interfaces/inspector";
import {
  setCurrentInspector,
  setRegions,
} from "../../features/admin/adminSlice";
import CustomSelect from "../../shared/ui/customSelect";
// import mockRegions from "../../shared/mock/regions";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

export default function InspectorsForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const defaultValues: IInspector = {
    lastName: "",
    firstName: "",
    middleName: "",
    login: "",
    id: 0,
    workerId: 0,
    region: { id: 0, name: "" },
    post: Post.INSPECTOR,
    inspectorId: 0,
  };
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentInspector = useAppSelector(
    (state) => state.admin.currentInspector
  );
  const [createInspector, { isLoading: isCreateInspectorLoading }] =
    useCreateInspectorMutation();
  const [updateInspector, { isLoading: isUpdateInspectorLoading }] =
    useUpdateInspectorMutation();
  const [deleteInspector, { isLoading: isDeleteInspectorLoading }] =
    useDeleteInspectorMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IInspector>({
    defaultValues,
    values: currentInspector || defaultValues,
  });

  const onSubmit: SubmitHandler<IInspector> = async (data) => {
    if (isButtonsVisible) {
      try {
        await updateInspector(data);
        changeFormVisibility(false);
      } catch (e) {
        console.log("inspectorsForm > saveError", e);
      }
    } else {
      try {
        await createInspector(data);
        changeFormVisibility(false);
      } catch (e) {
        console.log("inspectorsForm > saveError", e);
      }
    }
    reset();
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
  }

  function handleSelect(prop: any) {
    dispatch(setCurrentInspector({ ...currentInspector, ...prop }));
  }

  const regions = useAppSelector((state) => state.admin.regions);

  const { data: getRegionsData, isSuccess: isGetRegionsSuccess } =
    useGetRegionsQuery();

  useEffect(() => {
    if (isGetRegionsSuccess) {
      dispatch(setRegions(getRegionsData));
    } 
    // else {
    //   dispatch(setRegions(mockRegions));
    // }
  }, [isGetRegionsSuccess]);

  return (
    <>
      {isFormVisible && currentInspector ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>Изменение данных инспектора</h2>
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
              {errors.login?.message ? (
                <ErrorText>{errors.login.message}:</ErrorText>
              ) : (
                <InputTitle>Имя пользователя:</InputTitle>
              )}
              <InputDefault
                {...register("login", {
                  required: {
                    value: true,
                    message: "Введите имя пользователя",
                  },
                  onChange: (e) => handleSelect({ login: e.target.value }),
                })}
                placeholder="Имя пользователя"
                $redBorder={!!errors.login?.message}
                autoComplete="off"
                disabled={isButtonsVisible}
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

            <ButtonContainer>
              <ButtonDefault key="inspectorsButton1">Сохранить</ButtonDefault>
              {isButtonsVisible && (
                <ButtonDefault
                  $red
                  key="inspectorsButton3"
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
          text={`Вы действительно хотите удалить инспектора ${currentInspector?.lastName} ${currentInspector?.firstName} ${currentInspector?.middleName}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteInspector(+currentInspector!.workerId);
          }}
        />
      )}
      {isCreateInspectorLoading ||
      isUpdateInspectorLoading ||
      isDeleteInspectorLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
