import styled from "styled-components";

export const ImageGeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f2f2f2;
  border-radius: 8px;
  width: 100%;
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
