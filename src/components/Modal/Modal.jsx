import React from "react";
import {
  ModalCloseButton,
  ModalContainer,
  ModalContent,
} from "../../styled-components/styles";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <ModalCloseButton className="close-button" onClick={onClose}>
          <AiOutlineClose />
        </ModalCloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
