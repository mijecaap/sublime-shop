import React from "react";
import { Modal } from "../../../../components";
import {
  ActionButton,
  BuyNowButton,
  CartItem,
  CartModalContainer,
  CenteredDiv,
  ProductImage,
} from "./styles";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "reactfire";
import { useNavigate } from "react-router-dom";

const CartModal = ({
  modalOpen,
  closeModal,
  stateCart,
  removeCart,
  buyNow,
}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.currentUser;

  if (!user) {
    return (
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <CartModalContainer>
          <CenteredDiv>
            <div>Debes iniciar sesión para poder comprar</div>
          </CenteredDiv>
          <CenteredDiv>
            <BuyNowButton onClick={() => navigate("/auth")}>
              Iniciar Sesión
            </BuyNowButton>
          </CenteredDiv>
        </CartModalContainer>
      </Modal>
    );
  }

  if (stateCart.length === 0) {
    return (
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <CartModalContainer>
          <CenteredDiv>
            <div>Carrito vacío, empiece agregando productos.</div>
          </CenteredDiv>
        </CartModalContainer>
      </Modal>
    );
  }

  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <CartModalContainer>
        {stateCart.map((product, index) => (
          <CartItem key={product.id || index}>
            <CenteredDiv>
              <ProductImage src={product.imageUrl || product.imageCustomize} alt="" />
              <div>
                <div>{product.name || product.productItem?.name}</div>
                <div>{product.price || product.productItem?.price}</div>
              </div>
            </CenteredDiv>
            <div>
              <ActionButton onClick={() => removeCart(product)}>
                <AiOutlineClose size="24px" />
              </ActionButton>
            </div>
          </CartItem>
        ))}
        <CenteredDiv>
          <BuyNowButton onClick={() => buyNow()}>Comprar Ahora</BuyNowButton>
        </CenteredDiv>
      </CartModalContainer>
    </Modal>
  );
};

export default CartModal;
