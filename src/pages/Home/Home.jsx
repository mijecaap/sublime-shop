import React from "react";
import {
  BannerTitle,
  CartModal,
  ProductList,
  SearchBar,
  ShoppingCartIcon,
} from "./components";
import { HomeContainer, SearchCartContainer } from "./styles";
import useCartModal from "./hooks/useCartModal";
import useProductList from "./hooks/useProductList";
import ActionCustomizeButton from "./components/ActionCustomizeButton/ActionCustomizeButton";
import { Carousel } from "../../components";

const Home = () => {
  const {
    modalOpen,
    stateCart,
    openModal,
    closeModal,
    setCart,
    removeCart,
    buyNow,
  } = useCartModal();
  const { products } = useProductList();

  const images = [
    "https://firebasestorage.googleapis.com/v0/b/sublime-shop.appspot.com/o/images-customize%2F1213b840-dcbd-4b0d-9bd2-1fc50b776c3a.jpg?alt=media&token=bd50ab68-ff2b-4895-bedd-c82544907c5b",
    "https://firebasestorage.googleapis.com/v0/b/sublime-shop.appspot.com/o/images-customize%2F65503ee7-4a47-4c50-a694-75bd56077c06.jpg?alt=media&token=5882d9fc-6057-46bd-a65e-91bd1770e59b",
    "https://firebasestorage.googleapis.com/v0/b/sublime-shop.appspot.com/o/images-customize%2Fa2521638-d1fb-4b7e-a8b4-11f891883391.jpg?alt=media&token=0d66c575-9c28-4025-ae47-8276397c55c8",
    "https://firebasestorage.googleapis.com/v0/b/sublime-shop.appspot.com/o/images-customize%2Fb5508ec2-790e-45a2-8bb9-1b0a21056ad4.jpg?alt=media&token=0e2e7d39-a089-44b5-a69a-3222d15460c9",
  ];

  return (
    <HomeContainer>
      <Carousel images={images} />
      <ActionCustomizeButton />
      <hr />
      <SearchCartContainer>
        <SearchBar />
        <ShoppingCartIcon openModal={openModal} stateCart={stateCart} />
      </SearchCartContainer>
      <BannerTitle />
      <ProductList products={products} setCart={setCart} />
      <CartModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        stateCart={stateCart}
        removeCart={removeCart}
        buyNow={buyNow}
      />
    </HomeContainer>
  );
};

export default Home;
