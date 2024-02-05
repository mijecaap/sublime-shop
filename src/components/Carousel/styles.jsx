import styled from "styled-components";
import theme from "../../styled-components/theme";

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const CarouselImageContainer = styled.div`
  display: flex;
  width: ${({ images }) => images.length * 100}%;
  transition: transform 0.5s ease-in-out;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (min-width: ${theme.breakpoints.small}) {
    /* Tamaño de pantalla para tablet */
    height: 300px;
  }

  @media (min-width: ${theme.breakpoints.large}) {
    /* Tamaño de pantalla para escritorio */
    height: 400px;
  }
`;

export const IndicatorsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

export const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  margin: 0 4px;
  background-color: ${({ active }) => (active ? "#000" : "#ccc")};
  cursor: pointer;
`;
