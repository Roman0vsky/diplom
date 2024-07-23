import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { setTokens, setUser, signOut } from "../../features/auth/authSlice";
import { ButtonDefault, InputDefault } from "../../shared/globalStyles";
import {
  ButtonContainer,
  Container,
  ErrorText,
  Form,
  InfoText,
  InfoTitle,
  InputContainer,
  InputTitle,
  Title,
  Wrapper,
} from "./styled";
import LoaderElement from "../../shared/ui/loaderElement";
import { SubmitHandler, useForm } from "react-hook-form";
import IAdmin from "../../shared/interfaces/admin";
import IInspector from "../../shared/interfaces/inspector";
import IPassword from "../../shared/interfaces/password";
import {
  useGetUserMutation,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "../../features/auth/authService";
import { useEffect } from "react";
import Post from "../../shared/enums/post";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../../shared/helpers/helpers";

export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    dispatch(signOut());
    navigate("/auth");
  }

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: isUpdateUserLoading,
      isSuccess: isUpdateUserSuccess,
    },
  ] = useUpdateUserMutation();

  const [
    updatePassword,
    {
      isLoading: isUpdatePasswordLoading,
      isError: isUpdatePasswordError,
      error: updatePasswordError,
    },
  ] = useUpdatePasswordMutation();

  const defaultValues: IAdmin = {
    inspectorId: 0,
    workerId: 0,
    lastName: "",
    firstName: "",
    middleName: "",
    id: 0,
    login: "",
    post: Post.ADMIN,
    region: null,
  };

  const defaultValues2: IPassword = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdmin | IInspector>({
    defaultValues,
    values: user || defaultValues,
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    watch,
    reset,
  } = useForm<IPassword>({
    defaultValues: defaultValues2,
  });

  const [
    getUser,
    {
      data: getUserData,
      isLoading: isGetUserLoading,
      isSuccess: isGetUserSuccess,
    },
  ] = useGetUserMutation();

  const newPassword = watch("newPassword");
  const newPasswordConfirm = watch("newPasswordConfirm");

  const onSubmit: SubmitHandler<IAdmin | IInspector> = async (data) => {
    try {
      await updateUser({
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
      });
    } catch (e) {
      console.log("userFIOForm > saveError", e);
    }
  };

  const onSubmit2: SubmitHandler<IPassword> = async (data) => {
    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      reset();
    } catch (e) {
      console.log("userPasswordForm > saveError", e);
    }
  };

  useEffect(() => {
    if (isUpdateUserSuccess) {
      dispatch(setTokens(updateUserData));
      try {
        (async () => {
          await getUser();
        })();
      } catch (e) {
        console.log("userFIOForm > getUserError", e);
      }
    }
  }, [isUpdateUserSuccess]);

  useEffect(() => {
    if (isGetUserSuccess && getUserData) {
      dispatch(setUser(getUserData!));
    }
  }, [isGetUserSuccess, getUserData]);

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Изменение ФИО</Title>
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
            {isUpdateUserLoading || isGetUserLoading ? (
              <LoaderElement />
            ) : (
              <ButtonDefault key="usersFormButton1">Сохранить</ButtonDefault>
            )}
          </ButtonContainer>
          <Container>
            <InfoTitle>Имя пользователя</InfoTitle>
            <InfoText>{user?.login}</InfoText>
          </Container>
          <Container>
            <InfoTitle>Должность</InfoTitle>
            <InfoText>{user?.post}</InfoText>
          </Container>
        </Form>
        <Form onSubmit={handleSubmit2(onSubmit2)}>
          <Title>Изменение пароля</Title>
          <InputContainer>
            {isUpdatePasswordError ? (
              <ErrorText>
                {isFetchBaseQueryError(updatePasswordError) &&
                  isErrorWithMessage(updatePasswordError.data) &&
                  updatePasswordError.data?.message}
                :
              </ErrorText>
            ) : errors2.oldPassword?.message ? (
              <ErrorText>{errors2.oldPassword.message}:</ErrorText>
            ) : (
              <InputTitle>Старый пароль:</InputTitle>
            )}
            <InputDefault
              {...register2("oldPassword", {
                required: { value: true, message: "Введите старый пароль" },
              })}
              placeholder="Старый пароль"
              $redBorder={!!errors2.oldPassword?.message}
              autoComplete="off"
            />
          </InputContainer>
          <InputContainer>
            {errors2.newPassword?.message ? (
              <ErrorText>{errors2.newPassword.message}:</ErrorText>
            ) : (
              <InputTitle>Новый пароль:</InputTitle>
            )}
            <InputDefault
              {...register2("newPassword", {
                required: { value: true, message: "Введите новый пароль" },
              })}
              placeholder="Новый пароль"
              $redBorder={!!errors2.newPassword?.message}
              autoComplete="off"
            />
          </InputContainer>
          <InputContainer>
            {errors2.newPasswordConfirm?.message ? (
              <ErrorText>{errors2.newPasswordConfirm.message}:</ErrorText>
            ) : newPassword !== newPasswordConfirm ? (
              <ErrorText>Пароли не совпадают:</ErrorText>
            ) : (
              <InputTitle>Повтор нового пароля:</InputTitle>
            )}
            <InputDefault
              {...register2("newPasswordConfirm", {
                required: { value: true, message: "Введите новый пароль" },
              })}
              placeholder="Повтор нового пароля"
              $redBorder={!!errors2.newPasswordConfirm?.message}
              autoComplete="off"
            />
          </InputContainer>
          <ButtonContainer>
            {isUpdatePasswordLoading ? (
              <LoaderElement />
            ) : (
              <ButtonDefault key="usersFormButton2">Изменить</ButtonDefault>
            )}
          </ButtonContainer>
        </Form>
        <ButtonDefault
          key="usersFormButton3"
          onClick={handleSignOut}
          $marginTop="20px"
        >
          Выйти из аккаунта
        </ButtonDefault>
      </Wrapper>
    </>
  );
}
