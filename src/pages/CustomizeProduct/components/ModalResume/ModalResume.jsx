import React from "react";
import { Modal } from "../../../../components";
import {
  AddToCartButton,
  CardDesignContainer,
  CardItemContainer,
  DescriptionContainer,
  Image,
  ItemImageContainer,
  ModalResumeContainer,
  TitleName,
} from "./styles";
import { isNil } from "ramda";

const ModalResume = ({
  item,
  imageUrl,
  imageReference = null,
  descriptionValue,
  isOpen,
  onClose,
  setProductCart,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalResumeContainer>
        <TitleName>Producto</TitleName>
        <CardItemContainer>
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
        </CardItemContainer>
        <TitleName>Diseño</TitleName>
        <CardDesignContainer>
          <div>
            <b>Diseño personalizado:</b>
          </div>
          <Image src={imageUrl} alt="Product Image" />
          {!isNil(imageReference) && (
            <>
              <div>
                <b>Diseño de referencia:</b>
              </div>
              <Image src={imageReference} alt="Product Image" />
            </>
          )}
          <div>
            <b>Detalles adicionales:</b>
          </div>
          <div>{descriptionValue}</div>
        </CardDesignContainer>
      </ModalResumeContainer>
      <AddToCartButton onClick={() => setProductCart()}>
        Agregar
      </AddToCartButton>
    </Modal>
  );
};

export default ModalResume;
