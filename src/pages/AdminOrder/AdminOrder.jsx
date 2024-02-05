import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useFirestore } from "reactfire";
import {
  CardItem,
  CardItemCustomized,
  CardUser,
  StatusSection,
} from "./components";
import { Loader } from "../../components";
import {
  CardDetail,
  CardOrders,
  OrderContainer,
  OrderListContainer,
  SubtitleCard,
} from "./styles";

const AdminOrder = () => {
  const { orderId } = useParams();
  const firestore = useFirestore();
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrderById = async () => {
    const docRef = doc(firestore, "orders", orderId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const order = { id: docSnapshot.id, ...docSnapshot.data() };
      setOrderData(order);
      console.log(order);
    } else {
      console.log("No such document!");
    }
  };

  const getUserById = async () => {
    const docRef = doc(firestore, "users", orderData.userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const user = { id: docSnapshot.id, ...docSnapshot.data() };
      setUserData(user);
      setIsLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getOrderById();
  }, [orderId]);

  useEffect(() => {
    if (orderData.userId) {
      getUserById();
    }
  }, [orderData]);

  if (isLoading) return <Loader />;

  return (
    <OrderContainer>
      <CardUser user={userData} />
      <CardOrders>
        <CardDetail>
          <SubtitleCard>Productos:</SubtitleCard>
          <StatusSection status={orderData.status} id={orderData.id} getOrderById={getOrderById} />
        </CardDetail>
        <OrderListContainer>
          {orderData.itemsCustomize.map((item, index) => (
            <CardItemCustomized key={index} item={item} />
          ))}
          {orderData.items.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </OrderListContainer>
      </CardOrders>
    </OrderContainer>
  );
};

export default AdminOrder;
