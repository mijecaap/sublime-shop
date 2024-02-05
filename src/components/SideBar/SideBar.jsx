import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SideBarContainer,
  SideBarList,
  SideBarListButton,
  SideBarListCloseItem,
  SideBarListItem,
  SideBarLogInButton,
} from "./styles";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useUser } from "reactfire";
import { isNil } from "ramda";
import { useLogout } from "../../hooks";
import { navigationItems } from "../../routers/shop/navigationItems";
import { adminNavigation } from "../../routers/Admin/adminNavigation";

const SideBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigation, setNavigation] = useState([]);
  const { data } = useUser();
  const logOut = useLogout();

  
  const handleClick = (url) => {
    navigate(url);
    setIsOpen(false);
  };
  
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) setNavigation(adminNavigation);
    else setNavigation(navigationItems);
  }, [location]);
  
  if (!isOpen) return null;

  return (
    <>
      <SideBarContainer>
        <SideBarList>
          <SideBarListCloseItem onClick={() => setIsOpen(!isOpen)}>
            <AiOutlineClose size={24} color="white" />
          </SideBarListCloseItem>
          {navigation
            .filter((item) => item.inSidebar)
            .map((item, index) => (
              <SideBarListItem
                key={index}
                onClick={() => handleClick(item.url)}
              >
                {item.name}
              </SideBarListItem>
            ))}
          <SideBarListButton onClick={() => handleClick("/customize")}>
            Crea tu diseño
          </SideBarListButton>
        </SideBarList>
        {!isNil(data) ? (
          <SideBarLogInButton onClick={() => logOut()}>
            Cerrar Sesión
            <BiLogOut size={24} color="white" />
          </SideBarLogInButton>
        ) : (
          <SideBarLogInButton onClick={() => handleClick("/auth")}>
            Iniciar sesión
            <BiLogIn size={24} color="white" />
          </SideBarLogInButton>
        )}
      </SideBarContainer>
    </>
  );
};

export default SideBar;
