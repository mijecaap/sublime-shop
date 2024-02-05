import React from "react";
import {
  CardContainer,
  SkeletonButton,
  SkeletonImage,
  SkeletonPrice,
  SkeletonText,
} from "./styles";

const CardSkeletonLoader = () => {
  return (
    <CardContainer>
      <SkeletonImage />
      <div style={{ width: "100%" }}>
        <SkeletonText />
        <SkeletonPrice />
      </div>
      <SkeletonButton />
    </CardContainer>
  );
};

export default CardSkeletonLoader;
