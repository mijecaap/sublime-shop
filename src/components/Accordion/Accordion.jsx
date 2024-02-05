import React, { useState } from "react";
import {
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionText,
  AccordionWrapper,
} from "./styles";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Accordion = ({ children, title, isCompleted = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader isCompleted={isCompleted} onClick={toggleAccordion}>
        <AccordionText>{title}</AccordionText>
        <AccordionIcon>
          {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
        </AccordionIcon>
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionWrapper>
  );
};

export default Accordion;
