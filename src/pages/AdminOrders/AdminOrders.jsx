import React, { useEffect, useState } from "react";
import ListTable from "./components/ListTable/ListTable";
import { AdminOrdersContainer } from "./styles";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "reactfire";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const firestore = useFirestore();

  const getOrders = async () => {
    const collectionRef = collection(firestore, "orders");
    const querySnapshot = await getDocs(collectionRef);
    const ordersData = [];
    querySnapshot.forEach((doc) => {
      ordersData.push({ id: doc.id, ...doc.data() });
    });
    setOrders(ordersData);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <AdminOrdersContainer>
      <ListTable data={orders} />
    </AdminOrdersContainer>
  );
};

export default AdminOrders;
