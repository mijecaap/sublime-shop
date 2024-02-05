import React from "react";
import {
  AddToCartButton,
  CardDesignContainer,
  CardItemContainer,
  DescriptionContainer,
  DesignContainer,
  Image,
  ItemImageContainer,
  ModalResumeContainer,
  TitleName,
} from "./styles";
import { isEmpty, isNil } from "ramda";

const SectionResume = ({
  item,
  imageUrl,
  imageReference = null,
  descriptionValue,
  setProductCart,
}) => {
  console.log(descriptionValue);
  return (
    <ModalResumeContainer>
      <TitleName>Producto</TitleName>
      <CardItemContainer>
        {!isEmpty(item) && (
          <>
            <DescriptionContainer>
              <span>
                <b>Nombre:</b> {item.name}
              </span>
              <span>
                <b>Descripción:</b> {item.description}
              </span>
              <span>
                <b>Precio:</b> S/. {item.price}
              </span>
            </DescriptionContainer>
            <ItemImageContainer>
              <Image src={item.imageUrl} alt="Product Image" />
            </ItemImageContainer>
          </>
        )}
      </CardItemContainer>
      <TitleName>Diseño</TitleName>
      <CardDesignContainer>
        <DesignContainer>
          {!isEmpty(imageUrl) && (
            <div>
              <div>
                <b>Diseño personalizado:</b>
              </div>
              <Image src={imageUrl} alt="Product Image" />
            </div>
          )}
          {!isNil(imageReference) && (
            <div>
              <div>
                <b>Diseño de referencia:</b>
              </div>
              <Image src={imageReference} alt="Product Image" />
            </div>
          )}
        </DesignContainer>
        {!isEmpty(descriptionValue) && (
          <>
            <div>
              <b>Detalles adicionales:</b>
            </div>
            <div>{descriptionValue}</div>
          </>
        )}
      </CardDesignContainer>
      <AddToCartButton
        active={
          !isEmpty(item) &&
          !isEmpty(imageUrl) &&
          !isEmpty(descriptionValue)
        }
        onClick={() => setProductCart()}
      >
        Agregar
      </AddToCartButton>
    </ModalResumeContainer>
  );
};

export default SectionResume;
