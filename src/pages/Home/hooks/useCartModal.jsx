import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../../redux/states";
import { useNavigate } from "react-router-dom";

const useCartModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const stateCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const setCart = (product) => {
    dispatch(addProduct(product));
  };

  const removeCart = (product) => {
    dispatch(removeProduct(product));
  };

  const buyNow = () => {
    navigate("/checkout");
  };

  return {
    modalOpen,
    stateCart,
    openModal,
    closeModal,
    setCart,
    removeCart,
    buyNow,
  };
};

export default useCartModal;
