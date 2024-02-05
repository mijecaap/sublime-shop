import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "reactfire";

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const firestore = useFirestore();

  const getProducts = async () => {
    const collectionRef = collection(firestore, "products");
    const querySnapshot = await getDocs(collectionRef);
    const productsData = [];
    querySnapshot.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() });
    });
    setProducts(productsData);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
  };
};

export default useProductList;
