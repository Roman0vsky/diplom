import styled from "styled-components";
import { Palette } from "../../shared/globalStyles";
import LogoIMG from "../../shared/imgs/logo.png";

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background-color: ${Palette.primaryColor};
`;

export const Container = styled.div`
  display: flex;
  gap: 10px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  color: ${Palette.white};
  font-size: 24px;
  font-weight: 600;
  user-select: none;
`;

export const Logo = styled.div`
  background-image: url(${LogoIMG});
  width: 32px;
  height: 32px;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Nav = styled.nav`
  display: flex;

  .link {
    color: ${Palette.white};
    text-decoration: none;
    user-select: none;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 0 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
