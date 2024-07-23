import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorText, Form, InputContainer, InputField, Title } from "./styled";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import LoaderElement from "../../shared/ui/loaderElement";
import {
  useGetUserMutation,
  useSigninMutation,
} from "../../features/auth/authService";
import { setTokens, setUser } from "../../features/auth/authSlice";
import { ButtonDefault } from "../../shared/globalStyles";
import Post from "../../shared/enums/post";

interface IFormInput {
  login: string;
  password: string;
}

export default function AuthForm() {
  const user = useAppSelector((state) => state.auth.user);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const [
    signin,
    {
      data: signinData,
      isSuccess: isSigninSuccess,
      isError: isSigninError,
      isLoading: isSigninLoading,
    },
  ] = useSigninMutation();

  const [
    getUser,
    { data: getUserData, isError: isGetUserError, isSuccess: isGetUserSuccess },
  ] = useGetUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({ login, password }) => {
    try {
      await signin({ login: login, password: password });
    } catch (e) {
      console.log("authForm > signinError", e);
    }
    reset();
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSigninSuccess) {
      dispatch(setTokens(signinData));
      try {
        (async () => {
          await getUser();
        })();
      } catch (e) {
        console.log("authForm > getUserError", e);
      }
    }
  }, [isSigninSuccess]);

  useEffect(() => {
    if (isGetUserSuccess && getUserData) {
      dispatch(setUser(getUserData!));
    }
  }, [isGetUserSuccess, getUserData]);

  useEffect(() => {
    user?.post && setLoaded(true);

    if (isLoaded && user?.post === Post.INSPECTOR) {
      navigate("/social-workers");
    } else if (isLoaded && user?.post === Post.ADMIN) {
      navigate("/inspectors");
    }
  }, [user, isLoaded]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход в аккаунт</Title>
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
          autoComplete="off"
          tabIndex={1}
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
          autoComplete="off"
          tabIndex={2}
        />
        {errors.password?.message}
      </InputContainer>
      {isSigninLoading ? (
        <LoaderElement />
      ) : (
        <ButtonDefault
          onClick={handleSubmit(onSubmit)}
          $reverse
          $width="100px"
          tabIndex={3}
        >
          Войти
        </ButtonDefault>
      )}
      {isSigninError && <ErrorText>Неправильный логин или пароль</ErrorText>}
      {isGetUserError && <ErrorText>Не удалось войти в аккаунт</ErrorText>}
    </Form>
  );
}
