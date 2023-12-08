import { Link } from "react-router-dom";
import { Container, LinkContainer, Logo, Nav, Title, Wrapper } from "./styled";
import { useAppSelector } from "../../app/store/hooks";
import Post from "../../shared/enums/post";

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);

  return user?.post === Post.ADMIN ? (
    <Wrapper>
      <Container>
        <Logo />
        <Title>ТЦСОН Октябрьского района г. Витебска</Title>
      </Container>
      <Nav>
        <LinkContainer className="active">
          <Link className="link" to={"/staff"}>
            Сотрудники
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={""}>
            Участки
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={""}>
            Оказываемые услуги
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={""}>
            Отчёты
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/profile"}>
            Профиль
          </Link>
        </LinkContainer>
      </Nav>
    </Wrapper>
  ) : user?.post === Post.INSPECTOR ? (
    <Wrapper>
      <Container>
        <Logo />
        <Title>ТЦСОН Октябрьского района г. Витебска</Title>
      </Container>
      <Nav>
        <LinkContainer className="active">
          <Link className="link" to={"/social-workers"}>
            Соц. работники
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={""}>
            Подопечные
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={""}>
            Отчёты
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/profile"}>
            Профиль
          </Link>
        </LinkContainer>
      </Nav>
    </Wrapper>
  ) : (
    <></>
  );
}
