import styled from "styled-components";
import theme from "../../../../styled-components/theme";

export const ProductListContainer = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.small}) {
    /* Tamaño de pantalla para tablet */
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${theme.breakpoints.large}) {
    /* Tamaño de pantalla para escritorio */
    grid-template-columns: repeat(4, 1fr);
  }
`;
