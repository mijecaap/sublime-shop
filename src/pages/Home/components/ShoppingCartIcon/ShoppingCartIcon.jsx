import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ShoppingCartIcon = ({ openModal, stateCart }) => {
  return (
    <div
      style={{ width: "42px", height: "42px", position: "relative" }}
      onClick={openModal}
    >
      <div
        style={{
          position: "absolute",
          right: "0",
          zIndex: "9",
          backgroundColor: "#D9D9D9",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          textAlign: "center",
          fontSize: "11px",
          fontWeight: "bold",
        }}
      >
        {stateCart.length}
      </div>
      <FaShoppingCart
        size="32px"
        style={{ position: "absolute", bottom: "0" }}
      />
    </div>
  );
};

export default ShoppingCartIcon;
