import styled from "styled-components";
import theme from "../../../../styled-components/theme";

export const Container = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${theme.colors.text};
`;

export const Text = styled.span`
  margin-bottom: ${theme.breakpoints.small ? "0" : "1em"};
`;

export const StyledButton = styled.button`
  border: 2px solid ${theme.colors.buttonPrimary};
  background-color: transparent;
  color: ${theme.colors.buttonPrimary};
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.buttonPrimaryHover};
    color: ${theme.colors.textLight};
  }
`;
