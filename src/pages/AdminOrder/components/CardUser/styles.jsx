import styled from "styled-components";
import theme from "../../../../styled-components/theme";

// Componente de card
export const Card = styled.div`
  flex: 0 0 100%;
  height: 100%;
  border-radius: 5px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;

  @media (min-width: ${theme.breakpoints.small}) {
    /* Tamaño de pantalla para tablet */
    flex: 0 0 270px;
  }
`;

// Componente de foto
export const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  width: 100%;
`;

export const CardDetailsReference = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  padding: 8px 0 0;
`;

export const CardLabel = styled.span`
  font-weight: bold;
`;

// Componente de nombre
export const Name = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
`;

export const GenericPhoto = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #fff;
`;
