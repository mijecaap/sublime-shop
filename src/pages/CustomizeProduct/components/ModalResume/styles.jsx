import styled from "styled-components";

export const ModalResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #fff;
  gap: 16px;
  margin: 16px 0 0;
  overflow-y: auto; /* Habilita el scroll vertical */
  padding: 0 16px 16px; /* Añade un poco de espacio para el contenido */
  border-radius: 8px; /* Opcional: añade bordes redondeados */

  /* Estilización adicional del scroll */
  ::-webkit-scrollbar {
    width: 6px; /* Ancho del scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Color del thumb (la barra draggable) */
    border-radius: 3px; /* Opcional: añade bordes redondeados */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color del track (fondo del scrollbar) */
    border-radius: 3px; /* Opcional: añade bordes redondeados */
  }
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardItemContainer = styled(HorizontalContainer)`
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 16px;
`;

export const DescriptionContainer = styled(VerticalContainer)`
  width: 50%;
`;

export const ItemImageContainer = styled(VerticalContainer)`
  width: 50%;
  & > img {
    margin: 0;
  }
`;

export const CardDesignContainer = styled(VerticalContainer)`
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 16px;
  & > img {
    margin: 0;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const TitleName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const SubtitleName = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  padding: 16px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
