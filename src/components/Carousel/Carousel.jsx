import React, { useEffect, useState } from "react";
import {
  CarouselContainer,
  CarouselImage,
  CarouselImageContainer,
  Indicator,
  IndicatorsContainer,
} from "./styles";

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsImagesLoaded(true))
      .catch((error) => console.error("Error preloading images:", error));
  }, [images]);

  useEffect(() => {
    if (isImagesLoaded) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images, isImagesLoaded]);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  if (!isImagesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <CarouselContainer>
      <CarouselImageContainer
        style={{
          transform: `translateX(-${(activeIndex * 100) / images.length}%)`,
        }}
        images={images}
      >
        {images.map((image, index) => (
          <CarouselImage key={index} src={image} alt="Carousel Image" />
        ))}
      </CarouselImageContainer>
      <IndicatorsContainer>
        {images.map((_, index) => (
          <Indicator
            key={index}
            active={index === activeIndex}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </IndicatorsContainer>
    </CarouselContainer>
  );
};

export default Carousel;
