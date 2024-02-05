import React from "react";
import {
  FormContainer,
  ImageGeneratorContainer,
  ImageUploaderWrapper,
  ImagesContainer,
  Input,
  Label,
} from "./styles";
import ImageSelect from "../ImageSelect/ImageSelect";
import { isNil } from "ramda";

const ImageReference = ({ imageReference, setImageReference }) => {
  const handleImageUpload = (event) => {
    setImageReference({});
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageReference({ url: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageGeneratorContainer>
      {!isNil(imageReference) && (
        <ImagesContainer>
          <ImageSelect
            image={imageReference.url}
            isSelected={true}
            onSelect={() => {}}
          />
        </ImagesContainer>
      )}
      <FormContainer>
        <ImageUploaderWrapper>
          <Label htmlFor="image-reference-upload">Subir Imagen</Label>
          <Input
            id="image-reference-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ImageUploaderWrapper>
      </FormContainer>
    </ImageGeneratorContainer>
  );
};

export default ImageReference;
