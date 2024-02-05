import React from "react";
import { CardsContainer } from "./styles";
import CardSelect from "../CardSelect/CardSelect";

const ProductList = ({ items, selectedItem, setSelectedItem }) => {
  const handleCardSelect = (index) => {
    setSelectedItem(index);
  };
  return (
    <CardsContainer>
      {items.map((item, index) => (
        <CardSelect
          key={index}
          image={item.imageUrl}
          name={item.name}
          isSelected={selectedItem === index}
          onSelect={() => handleCardSelect(index)}
        />
      ))}
    </CardsContainer>
  );
};

export default ProductList;
