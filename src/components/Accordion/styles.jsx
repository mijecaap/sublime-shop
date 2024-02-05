import { props } from "ramda";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    height: auto;
  }
`;

// Estilos del componente del acordeón
export const AccordionWrapper = styled.div`
  width: 100%;
`;

export const AccordionHeader = styled.div`
  background-color: ${(props) => (props.isCompleted ? "#4caf50" : "#333")};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between; /* Añade espaciado entre el ícono y el texto */
`;

export const AccordionText = styled.div`
  width: 90%;
`;

export const AccordionIcon = styled.div`
  width: 10%;
  & svg {
    font-size: 16px;
    float: right;
  }
`;

export const AccordionContent = styled.div`
  overflow: hidden;
  padding: 16px 0;
  animation: ${slideDown} 0.3s ease-in-out;
`;
