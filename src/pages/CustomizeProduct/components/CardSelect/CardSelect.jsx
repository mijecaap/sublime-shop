import React, { useState } from "react";
import { CardContainer, CardImage, CardName } from "./styles";

const CardSelect = ({ image, name, isSelected, onSelect }) => {
  const handleClick = () => {
    if (!isSelected) {
      onSelect();
    }
  };

  return (
    <CardContainer selected={isSelected} onClick={handleClick}>
      <CardImage src={image} alt="Card Image" />
      <CardName>{name}</CardName>
    </CardContainer>
  );
};

export default CardSelect;
