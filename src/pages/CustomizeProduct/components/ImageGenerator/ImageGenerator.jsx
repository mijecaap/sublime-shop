import React, { useState } from "react";
import {
  Button,
  Input,
  TextArea,
  FormContainer,
  ImagesContainer,
  ImageGeneratorContainer,
  ImageUploaderWrapper,
  Label,
  Text,
} from "./styles";
import ImageSelect from "../ImageSelect/ImageSelect";
import { Loader } from "../../../../components";

const ImageGenerator = ({
  images,
  inputValue,
  selectedImage,
  setImages,
  setInputValue,
  setSelectedImage,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleImageUpload = (event) => {
    setImages([]);
    handleImageSelect(null);
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      handleImageSelect(0);
      setImages([{
        url: reader.result,
        file
      }]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = async () => {
    try {
      setIsLoading(true);
      handleImageSelect(null);
      setImages([]);
      const response = await fetch(
        "https://us-central1-sublime-shop.cloudfunctions.net/handleImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: inputValue,
          }),
        }
      );
      const { data } = await response.json();
      setImages(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <ImageGeneratorContainer>
      {images.length > 0 && (
        <ImagesContainer>
          {images.map((image, index) => (
            <ImageSelect
              key={index}
              image={image.url}
              isSelected={index === selectedImage}
              onSelect={() => handleImageSelect(index)}
            />
          ))}
        </ImagesContainer>
      )}
      <FormContainer>
        <TextArea
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ingrese una descripción"
        />
        <Button onClick={handleButtonClick} isLoading={isLoading}>
          Generar imágenes
        </Button>
        <Text>ó sube una imagen tuya</Text>
        <ImageUploaderWrapper>
          <Label htmlFor="image-upload">Subir Imagen</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ImageUploaderWrapper>
      </FormContainer>
      {isLoading && <Loader />}
    </ImageGeneratorContainer>
  );
};

export default ImageGenerator;
