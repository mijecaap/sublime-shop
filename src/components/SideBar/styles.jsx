import styled from "styled-components";
import theme from "../../styled-components/theme";

export const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  background-color: ${theme.colors.secondary};
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: ${theme.breakpoints.small}) {
    width: 30%;
  }
`;

export const SideBarList = styled.ul`
  height: 100%;
  list-style: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SideBarListCloseItem = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const SideBarListItem = styled.li`
  cursor: pointer;
  color: ${theme.colors.white};
  font-weight: bold;
`;

export const SideBarListButton = styled.li`
  cursor: pointer;
  color: ${theme.colors.white};
  font-weight: bold;
  background-color: ${theme.colors.buttonSecondary};
  padding: 8px 16px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${theme.colors.buttonSecondaryHover};
  }
`;

export const SideBarLogInButton = styled.div`
  cursor: pointer;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.white};
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease-in-out;
  border-top: 1px solid ${theme.colors.buttonSecondaryHover};
  &:hover {
    background-color: ${theme.colors.buttonSecondaryHover};
  }
`;
