import styled from "styled-components";
import theme from "../../styled-components/theme";

export const Container = styled.div`
  height: 56px;
  background-color: ${theme.colors.primary};
`;

export const NavbarContent = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 12px 20px;
`;

export const NavContainer = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li {
    margin-right: 16px;
    &:hover {
      border-bottom: 2px solid white;
    }
    &:last-child {
      border: 0px;
    }
  }

  a {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
`;

export const ButtonStyles = styled.button`
  background-color: ${theme.colors.buttonPrimary};
  font-weight: bold;
  color: #fff;
  border: none;
  padding: 4px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.buttonPrimaryHover};
  }
`;

export const HamburgerIconContainer = styled.div`
  cursor: pointer;
`;

export const ProfileIconContainer = styled.div`
  height: 32px;
  width: 32px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionsContainer = styled.div`
  background-color: white;
  color: black;
  position: absolute;
  top: 40px;
  right: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

export const ProfileEmail = styled.div`
  font-weight: bold;
  padding: 8px;
  border-bottom: 1px solid #f5f5f5;
`;

export const LogoutButton = styled.div`
  cursor: pointer;
  padding: 8px;
  background-color: ${(props) => (props.isHovered ? "#f5f5f5" : "white")};
`;

export const LoginLink = styled.div`
  color: white;
  cursor: pointer;
`;
