import React, { useEffect, useState } from "react";
import {
  ArrowIcon,
  Container,
  Dropdown,
  Option,
  SelectContainer,
} from "./styles";
import { convertToTitleCase } from "../../../../utilities";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../../../components";

const StatusSection = ({ status, id, getOrderById }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const firestore = useFirestore();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const updateStatus = async () => {
    setLoading(true);
    await updateDoc(doc(firestore, "orders", id), {
      status: selectedOption,
    })
      .then(() => {
        console.log("Document successfully updated!");
        getOrderById();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedOption) {
      updateStatus();
    }
  }, [selectedOption]);

  return (
    <>
      <Container status={status}>
        <SelectContainer onClick={toggleDropdown}>
          <span>{convertToTitleCase(status) || "Seleccione una opción"}</span>
          <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
        </SelectContainer>
        {isOpen && (
          <Dropdown>
            <Option onClick={() => selectOption("pendiente")}>Pendiente</Option>
            <Option onClick={() => selectOption("diseño")}>Diseño</Option>
            {/* <Option onClick={() => selectOption("aprobado")}>Aprobado</Option> */}
            <Option onClick={() => selectOption("produccion")}>
              Producción
            </Option>
            <Option onClick={() => selectOption("envio")}>Envío</Option>
            <Option onClick={() => selectOption("entregado")}>Entregado</Option>
          </Dropdown>
        )}
      </Container>
      {loading && <Loader />}
    </>
  );
};

export default StatusSection;
