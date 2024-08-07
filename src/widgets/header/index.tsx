import { Link, useLocation } from "react-router-dom";
import { Container, LinkContainer, Logo, Nav, Title, Wrapper } from "./styled";
import { useAppSelector } from "../../app/store/hooks";
import Post from "../../shared/enums/post";

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  return user?.post === Post.ADMIN && location.pathname !== "/auth" ? (
    <Wrapper>
      <Container>
        <Logo />
        <Title>ТЦСОН Октябрьского района г. Витебска</Title>
      </Container>
      <Nav>
        <LinkContainer>
          <Link className="link" to={"/inspectors"}>
            Инспектора
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/regions"}>
            Участки
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"admin-report"}>
            Отчёт
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/profile"}>
            Профиль
          </Link>
        </LinkContainer>
      </Nav>
    </Wrapper>
  ) : user?.post === Post.INSPECTOR && location.pathname !== "/auth" ? (
    <Wrapper>
      <Container>
        <Logo />
        <Title>ТЦСОН Октябрьского района г. Витебска</Title>
      </Container>
      <Nav>
        <LinkContainer>
          <Link className="link" to={"/social-workers"}>
            Соц. работники
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/clients"}>
            Подопечные
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/favours"}>
            Оказываемые услуги
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/inspector-report"}>
            Отчёт
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
