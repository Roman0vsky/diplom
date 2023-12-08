import { useAppSelector } from "../../app/store/hooks";
import { Outlet, useNavigate } from "react-router";
import { Container, ErrorText, Title } from "./styled";
import { ButtonDefault } from "../../shared/globalStyles";
import Post from "../../shared/enums/post";

interface IProps {
  authRoutes?: boolean;
  onlyAdminRoutes?: boolean;
  onlyInspectorRoutes?: boolean;
  commonRoutes?: boolean;
}

export default function ProtectedRoute({
  authRoutes,
  onlyAdminRoutes,
  onlyInspectorRoutes,
  commonRoutes,
}: IProps) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  function buttonHandlerSignIn() {
    navigate("/auth");
  }

  function buttonHandler() {
    user?.post === Post.ADMIN
      ? navigate("/staff")
      : navigate("/social-workers");
  }

  if (authRoutes) {
    return user ? (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>Вы уже авторизованы</ErrorText>
        <ButtonDefault onClick={buttonHandler}>
          Вернуться на главную
        </ButtonDefault>
      </Container>
    ) : (
      <Outlet />
    );
  }
  if (onlyAdminRoutes) {
    return user?.post === Post.ADMIN ? (
      <Outlet />
    ) : user ? (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>
          У вас недостаточно прав для посещения данной страницы
        </ErrorText>
        <ButtonDefault onClick={buttonHandler}>На главную</ButtonDefault>
      </Container>
    ) : (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>Вы не вошли в аккаунт</ErrorText>
        <ButtonDefault onClick={buttonHandlerSignIn}>
          Войти в аккаунт
        </ButtonDefault>
      </Container>
    );
  }
  if (onlyInspectorRoutes) {
    return user?.post === Post.INSPECTOR ? (
      <Outlet />
    ) : user ? (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>
          У вас недостаточно прав для посещения данной страницы
        </ErrorText>
        <ButtonDefault onClick={buttonHandler}>На главную</ButtonDefault>
      </Container>
    ) : (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>Вы не вошли в аккаунт</ErrorText>
        <ButtonDefault onClick={buttonHandlerSignIn}>
          Войти в аккаунт
        </ButtonDefault>
      </Container>
    );
  }
  if (commonRoutes) {
    return user ? (
      <Outlet />
    ) : (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>Вы не вошли в аккаунт</ErrorText>
        <ButtonDefault onClick={buttonHandlerSignIn}>
          Войти в аккаунт
        </ButtonDefault>
      </Container>
    );
  }
}
