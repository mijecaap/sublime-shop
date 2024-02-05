import React, { useState } from "react";
import {
  ArrowIcon,
  Container,
  Dropdown,
  Option,
  SelectContainer,
  StatusTitle,
} from "./styles";

const StatusSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <StatusTitle>Tus pedidos:</StatusTitle>
      <SelectContainer onClick={toggleDropdown}>
        <span>{selectedOption || "Seleccione una opción"}</span>
        <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
      </SelectContainer>
      {isOpen && (
        <Dropdown>
          <Option onClick={() => selectOption("Pendiente")}>Pendiente</Option>
          <Option onClick={() => selectOption("Diseño")}>Diseño</Option>
          <Option onClick={() => selectOption("Aprobado")}>Aprobado</Option>
          <Option onClick={() => selectOption("Producción")}>Producción</Option>
          <Option onClick={() => selectOption("Envío")}>Envío</Option>
          <Option onClick={() => selectOption("Entregado")}>Entregado</Option>
        </Dropdown>
      )}
    </Container>
  );
};

export default StatusSection;
