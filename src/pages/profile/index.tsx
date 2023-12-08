import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { signOut } from "../../features/auth/authSlice";
import Post from "../../shared/enums/post";
import { ButtonDefault } from "../../shared/globalStyles";
import { Container, InfoText, InfoTitle, Title, Wrapper } from "./styled";

export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    dispatch(signOut());
    navigate("/auth");
  }

  return (
    <Wrapper>
      <Title>Данные аккаунта</Title>
      <Container>
        <InfoTitle>Фамилия</InfoTitle>
        <InfoText>{user?.lastName}</InfoText>
      </Container>
      <Container>
        <InfoTitle>Имя</InfoTitle>
        <InfoText>{user?.firstName}</InfoText>
      </Container>
      <Container>
        <InfoTitle>Отчество</InfoTitle>
        <InfoText>{user?.middleName}</InfoText>
      </Container>
      {user?.post === Post.INSPECTOR && (
        <Container>
          <InfoTitle>Регион</InfoTitle>
          <InfoText>{user?.regionId}</InfoText>
        </Container>
      )}
      <ButtonDefault onClick={handleSignOut} $marginTop="20px">
        Выйти из аккаунта
      </ButtonDefault>
    </Wrapper>
  );
}
