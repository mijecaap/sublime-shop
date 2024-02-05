import React from "react";
import {
  Button,
  CardContainer,
  Image,
  InfoContainer,
  Name,
  Price,
} from "./styles";

const Card = ({ product, setCart }) => {
  const { name, price, imageUrl } = product;

  return (
    <CardContainer>
      <Image src={imageUrl} alt="" />
      <InfoContainer>
        <Name>{name}</Name>
        <Price>S/. {price}</Price>
      </InfoContainer>
      <Button onClick={() => setCart(product)}>Agregar al carrito</Button>
    </CardContainer>
  );
};

export default Card;
