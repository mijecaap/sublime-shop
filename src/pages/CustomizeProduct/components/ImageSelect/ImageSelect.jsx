import React from "react";
import { CardContainer, CardImage } from "./styles";

const ImageSelect = ({ image, isSelected, onSelect }) => {
  const handleClick = () => {
    if (!isSelected) {
      onSelect();
    }
  };

  return (
    <CardContainer selected={isSelected} onClick={handleClick}>
      <CardImage src={image} alt="Card Image" />
    </CardContainer>
  );
};

export default ImageSelect;
