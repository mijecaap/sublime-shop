import styled from "styled-components";
import theme from "../../../../styled-components/theme";

export const ImageGeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  background-color: #f2f2f2;
  border-radius: 8px;
  width: 100%;

  @media (min-width: ${theme.breakpoints.small}) {
    /* Tamaño de pantalla para escritorio */
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  background-color: #333;
  border-radius: 8px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px 16px;
  background-color: ${(props) => (props.isLoading ? "#ccc" : "#ff8148")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${(props) =>
    props.isLoading ? "not-allowed !important" : "cursor !important"};
  pointer-events: ${(props) => (props.isLoading ? "none" : "auto")};
`;

export const Text = styled.p`
  margin: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

export const ImageUploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  background-color: #f2f2f2;
  color: #333;
  padding: 8px 16px;
  border: 2px dashed #999;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: #555;
  }
`;

export const Input = styled.input`
  display: none;
`;