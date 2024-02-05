import React, { useEffect, useState } from "react";
import {
  CardContainer,
  CardDescription,
  CardImage,
  CardImageContainer,
  CardImageContent,
  CardTitle,
} from "./styles";
import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

const CardItem = ({ item }) => {
  const [order, setOrder] = useState({});
  const { id } = item;
  const firestore = useFirestore();

  const getOrder = async () => {
    const docRef = doc(firestore, "products", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const orderData = { id: docSnapshot.id, ...docSnapshot.data() };
      console.log(orderData);
      setOrder(orderData);
    } else {
      console.log("El documento no existe.");
      setOrder(null);
    }
  };

  useEffect(() => {
    if (id) getOrder();
  }, [id]);

  return (
    <CardContainer>
      <CardImageContainer>
        {order.imageUrl && (
          <CardImageContent>
            <CardTitle>Diseño:</CardTitle>
            <CardImage src={order.imageUrl} alt="Customize" />
          </CardImageContent>
        )}
      </CardImageContainer>
      <CardTitle>{order.name}</CardTitle>
    </CardContainer>
  );
};

export default CardItem;
