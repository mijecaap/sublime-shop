import React, { useEffect, useState } from "react";
import { Accordion, Loader } from "../../components";
import {
  ImageGenerator,
  ImageReference,
  ModalResume,
  SectionResume,
} from "./components";
import ProductList from "./components/ProductList/ProductList";
import {
  AddToCartButton,
  CustomizeProductContainer,
  CartButtonContainer,
  TextArea,
  CustomizeProductForm,
} from "./styles";
import { isEmpty, isNil } from "ramda";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/states";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import theme from "../../styled-components/theme";
import { useWindowResize } from "../../hooks";

const CustomizeProduct = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [promptValue, setPromptValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageReference, setImageReference] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screenWidth = useWindowResize();

  const onClose = () => setIsOpen(false);

  const getItems = async () => {
    const collectionRef = collection(firestore, "items");
    const querySnapshot = await getDocs(collectionRef);
    const productsData = [];
    querySnapshot.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() });
    });
    setItems(productsData);
  };

  const setProductCart = async () => {
    setIsLoading(true);
    let imageCustomizeUrl = "";
    let imageReferenceUrl = "";
    const storage = getStorage();

    const uploadImageAndGetUrl = async (image) => {
      if (image.url.startsWith("data:image")) {
        const imageName = uuidv4();
        const storageRef = ref(storage, "images-customize/" + imageName);
        await uploadBytes(storageRef, image.file);
        const url = await getDownloadURL(storageRef);
        return url;
      } else {
        const response = await fetch(
          "https://us-central1-sublime-shop.cloudfunctions.net/handleUploadImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageUrl: image.url,
            }),
          }
        );
        const { imageUrl } = await response.json();
        return imageUrl;
      }
    };

    if (selectedImage in images) {
      imageCustomizeUrl = await uploadImageAndGetUrl(images[selectedImage]);
    }

    if (!isNil(imageReference)) {
      imageReferenceUrl = await uploadImageAndGetUrl(images[selectedImage]);
    }

    const product = {
      imageCustomize: imageCustomizeUrl,
      imageReference: imageReferenceUrl,
      productItem: items[selectedItem],
      details: descriptionValue,
      isCostumize: true,
    };

    dispatch(addProduct(product));
    navigate("/checkout");
    setIsLoading(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <CustomizeProductContainer>
      <CustomizeProductForm>
        <Accordion
          title={"Selecciona un producto"}
          isCompleted={!isNil(selectedItem)}
        >
          <ProductList
            items={items}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </Accordion>
        <Accordion
          title={"Seleccione su diseño (Generada por IA o suba una imagen)"}
          isCompleted={!isNil(selectedImage)}
        >
          <ImageGenerator
            images={images}
            inputValue={promptValue}
            selectedImage={selectedImage}
            setImages={setImages}
            setInputValue={setPromptValue}
            setSelectedImage={setSelectedImage}
          />
        </Accordion>
        <Accordion
          title={"Subir una imagen de referencia (Opcional)"}
          isCompleted={!isNil(imageReference)}
        >
          <ImageReference
            imageReference={imageReference}
            setImageReference={setImageReference}
          />
        </Accordion>
        <Accordion
          title={"Detalles específicos adicionales"}
          isCompleted={!isEmpty(descriptionValue)}
        >
          <TextArea
            type="text"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            placeholder="Escribe aquí los detalles adicionales"
          />
        </Accordion>
        {screenWidth <= theme.breakpoints.largeValue && (
          <CartButtonContainer>
            <AddToCartButton
              active={
                !isNil(selectedItem) &&
                !isNil(selectedImage) &&
                !isEmpty(descriptionValue)
              }
              onClick={() => setIsOpen(true)}
            >
              Agregar al carrito
            </AddToCartButton>
          </CartButtonContainer>
        )}
        <ModalResume
          item={items[selectedItem] || {}}
          imageUrl={images[selectedImage]?.url || ""}
          imageReference={imageReference?.url || null}
          descriptionValue={descriptionValue}
          isOpen={isOpen}
          onClose={onClose}
          setProductCart={setProductCart}
        />
        {isLoading && <Loader />}
      </CustomizeProductForm>
      {screenWidth > theme.breakpoints.largeValue && (
        <SectionResume
          item={items[selectedItem] || {}}
          imageUrl={images[selectedImage]?.url || ""}
          imageReference={imageReference?.url || null}
          descriptionValue={descriptionValue}
          setProductCart={setProductCart}
        />
      )}
    </CustomizeProductContainer>
  );
};

export default CustomizeProduct;
