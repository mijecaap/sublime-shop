import React from "react";
import {
  CardContainer,
  CardDescription,
  CardImage,
  CardImageContainer,
  CardImageContent,
  CardTitle,
} from "./styles";

const CardItemCustomized = ({ item }) => {
  const { imageCustomizeUrl, imageReferenceUrl, details, productItem } = item;

  return (
    <CardContainer>
      <CardImageContainer>
        {imageCustomizeUrl && (
          <CardImageContent>
            <CardTitle>Diseño:</CardTitle>
            <CardImage src={imageCustomizeUrl} alt="Customize" />
          </CardImageContent>
        )}
        {imageReferenceUrl && (
          <CardImageContent>
            <CardTitle>Referencia:</CardTitle>
            <CardImage src={imageReferenceUrl} alt="Reference" />
          </CardImageContent>
        )}
      </CardImageContainer>
      <CardTitle>Producto: {productItem.name}</CardTitle>
      <CardDescription>{details}</CardDescription>
    </CardContainer>
  );
};

export default CardItemCustomized;
