import styled from "styled-components";
import theme from "./theme";

export const LayoutContainer = styled.div`
  min-height: calc(100vh - 56px);
  width: 100%;
  background-color: #f1f1f1;
`;

export const LayoutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const ModalCloseButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 8px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;
