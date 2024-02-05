import React, { useRef, useState } from "react";
import { isNil } from "ramda";
import { BsFillPersonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useUser } from "reactfire";
import {
  ButtonStyles,
  Container,
  HamburgerIconContainer,
  LoginLink,
  LogoutButton,
  NavContainer,
  NavbarContent,
  OptionsContainer,
  ProfileEmail,
  ProfileIconContainer,
} from "./styles";
import theme from "../../styled-components/theme";
import { useLogout, useOutsideClick, useWindowResize } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const { data } = useUser();
  const navigate = useNavigate();
  const logOut = useLogout();
  const screenWidth = useWindowResize();

  const redirectLogin = () => {
    navigate("/auth");
  };

  const handleIconClick = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = () => {
    logOut();
    setShowOptions(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOutsideClick = () => {
    setShowOptions(false);
  };

  useOutsideClick(containerRef, handleOutsideClick);

  return (
    <Container>
      <NavbarContent>
        {screenWidth < theme.breakpoints.largeValue ? (
          <HamburgerIconContainer onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu color="white" size="20px" />
          </HamburgerIconContainer>
        ) : (
          <NavContainer>
            <ul>
              <li>
                <Link to="/home">Inicio</Link>
              </li>
              {/* <li>
                <Link to="/">Categorias</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">Contacto</Link>
              </li> */}
              <li>
                <ButtonStyles onClick={() => navigate("/customize")}>
                  Crea tu diseño
                </ButtonStyles>
              </li>
            </ul>
          </NavContainer>
        )}
        {!isNil(data) ? (
          <div ref={containerRef}>
            <ProfileIconContainer onClick={handleIconClick}>
              <BsFillPersonFill size="20px" color={theme.colors.primary} />
            </ProfileIconContainer>
            {showOptions && (
              <OptionsContainer>
                <ProfileEmail>{data.email}</ProfileEmail>
                <LogoutButton
                  onClick={handleLogout}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  isHovered={isHovered}
                >
                  Cerrar sesión
                </LogoutButton>
              </OptionsContainer>
            )}
          </div>
        ) : (
          <LoginLink onClick={() => redirectLogin()}>Iniciar Sesión</LoginLink>
        )}
      </NavbarContent>
    </Container>
  );
};

export default Navbar;
