import React, { useEffect, useState } from "react";
import { CardOrder, StatusSection } from "./components";
import { useFirestore, useUser } from "reactfire";
import { collection, getDocs, query, where } from "firebase/firestore";
import { CardListContainer } from "./styles";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const firestore = useFirestore();
  const user = useUser();

  const getOrders = async () => {
    const collectionRef = collection(firestore, "orders");
    const querySnapshot = await getDocs(
      query(collectionRef, where("userId", "==", user.data.uid))
    );
    const ordersData = [];
    querySnapshot.forEach((doc) => {
      ordersData.push({ id: doc.id, ...doc.data() });
    });
    console.log(ordersData);
    setOrders(ordersData);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <StatusSection />
      <CardListContainer>
        {orders.map((order) => (
          <CardOrder key={order.id} order={order} />
        ))}
      </CardListContainer>
      <div>MyOrders</div>
    </>
  );
};

export default MyOrders;
