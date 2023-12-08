import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorText, Form, InputContainer, InputField, Title } from "./styled";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/hooks";
import LoaderElement from "../../shared/ui/loaderElement";
import {
  useLazyGetUserQuery,
  useSigninMutation,
} from "../../features/auth/authService";
import { setTokens, setUser } from "../../features/auth/authSlice";
import { ButtonDefault } from "../../shared/globalStyles";

interface IFormInput {
  login: string;
  password: string;
}

export default function AuthForm() {
  const [
    signin,
    {
      data: signinData,
      isSuccess: isSigninSuccess,
      isError: isSigninError,
      isLoading: isSigninLoading,
      error: signinError,
    },
  ] = useSigninMutation();

  const [
    getUser,
    {
      data: getUserData,
      isError: isGetUserError,
      isSuccess: isGetUserSuccess,
      error: getUserError,
    },
  ] = useLazyGetUserQuery();

  const onSubmit: SubmitHandler<IFormInput> = async ({ login, password }) => {
    try {
      await signin({ login: login, password: password });
      if (isSigninError) {
        throw signinError;
      }
    } catch (e) {
      console.log(`authForm > index.ts > signinError: ${e}`);
    }
    reset();
  };
  // eve.holt@reqres.in
  // cityslicka

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSigninSuccess) {
      dispatch(setTokens(signinData));
      try {
        (async () => {
          await getUser();
        })();
        if (isGetUserSuccess) {
          dispatch(setUser(getUserData!));
          navigate("/social-workers");
        } else {
          throw getUserError;
        }
      } catch (e) {
        console.log(`authForm > index.ts > getUserError: ${e}`);
      }
    }
  }, [isSigninSuccess]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход в аккаунт</Title>
      {/* <h3>eve.holt@reqres.in</h3> */}
      {/* <h3>cityslicka</h3> */}
      <InputContainer>
        <InputField
          {...register("login", {
            required: { value: true, message: "Введите логин" },
            minLength: { value: 4, message: "Минимум 4 буквы" },
            maxLength: { value: 40, message: "Максимум 40 букв" },
          })}
          placeholder="Логин"
          type="text"
          $borderRed={isSigninError}
        />
        {errors.login?.message}
      </InputContainer>
      <InputContainer>
        <InputField
          {...register("password", {
            required: { value: true, message: "Введите пароль" },
            minLength: { value: 4, message: "Минимум 4 буквы" },
            maxLength: { value: 20, message: "Максимум 20 букв" },
          })}
          placeholder="Пароль"
          type="text"
          $borderRed={isSigninError}
        />
        {errors.password?.message}
      </InputContainer>
      {isSigninLoading ? (
        <LoaderElement />
      ) : (
        <ButtonDefault onClick={handleSubmit(onSubmit)} $reverse $width="100px">
          Войти
        </ButtonDefault>
      )}
      {isSigninError && <ErrorText>Неправильный логин или пароль</ErrorText>}
      {isGetUserError && <ErrorText>Не удалось войти в аккаунт</ErrorText>}
    </Form>
  );
}
