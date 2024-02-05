import React from "react";
import { ProductListContainer } from "./styles";
import { Card } from "../../../../components";
import CardSkeletonLoader from "../../../../components/CardSkeletonLoader/CardSkeletonLoader";

const ProductList = ({ products = [], setCart }) => {
  return (
    <ProductListContainer>
      {products.length === 0
        ? Array.from({ length: 5 }).map((_, index) => (
            <CardSkeletonLoader key={index} />
          ))
        : products.map((product) => (
            <Card key={product.id} product={product} setCart={setCart} />
          ))}
    </ProductListContainer>
  );
};

export default ProductList;
