import { useNavigate } from "react-router";
import { Container, ErrorText, Title } from "./styled";
import { ButtonDefault } from "../../shared/globalStyles";
import { useAppSelector } from "../../app/store/hooks";
import Post from "../../shared/enums/post";

export default function ErrorBlock() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  function buttonHandler() {
    user?.post === Post.INSPECTOR
      ? navigate("/social-workers")
      : user?.post === Post.ADMIN
      ? navigate("/staff")
      : navigate("/auth");
  }

  return (
    <Container>
      <Title>Ошибка!</Title>
      <ErrorText>Что-то пошло не так...</ErrorText>
      <ButtonDefault onClick={buttonHandler}>
        Вернуться на главную
      </ButtonDefault>
    </Container>
  );
}
