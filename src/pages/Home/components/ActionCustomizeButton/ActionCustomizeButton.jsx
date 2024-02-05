import React from "react";
import { Container, StyledButton, Text } from "./styles";
import { useNavigate } from "react-router-dom";
import { useWindowResize } from "../../../../hooks";
import theme from "../../../../styled-components/theme";

const ActionCustomizeButton = () => {
  const navigate = useNavigate();
  const screenWidth = useWindowResize();

  const handleClick = () => {
    navigate("/customize");
  };

  return (
    <>
      <Container>
        <Text>
          Crea diseños únicos y sorprendentes para tus productos personalizados
        </Text>
        {screenWidth > theme.breakpoints.smallValue && (
          <>
            <br />
            <Text>
              Descubre la revolucionaria generación de imágenes de Dall-e.
              ¡Personaliza tu diseño ahora!
            </Text>
          </>
        )}
      </Container>
      <StyledButton onClick={handleClick}>
        Personaliza tu diseño ahora
      </StyledButton>
    </>
  );
};

export default ActionCustomizeButton;
