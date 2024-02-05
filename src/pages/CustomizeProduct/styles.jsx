import styled from "styled-components";
import theme from "../../styled-components/theme";

export const CustomizeProductContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

export const CustomizeProductForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;

  @media (min-width: ${theme.breakpoints.large}) {
    /* Tamaño de pantalla para escritorio */
    width: 50%;
  }
`;

export const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  width: 100%;
`;

export const CartButtonContainer = styled.div`
  margin-top: auto;
  position: sticky;
  bottom: 16px;
  padding: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AddToCartButton = styled.button`
  background-color: ${(props) => (props.active ? "#ff5722" : "#cccccc")};
  color: #fff;
  font-size: 16px;
  padding: 16px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) =>
    props.active ? "pointer !important" : "auto !important"};
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
`;
