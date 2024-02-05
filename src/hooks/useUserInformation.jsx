import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const useUserInformation = (auth, firestore) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInformation = async () => {
      setLoading(true);

      if (!auth.currentUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const docRef = doc(firestore, "users", auth.currentUser.uid);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.isAdmin) {
            setIsAdmin(true);
            console.log("El usuario es administrador");
          } else {
            setIsAdmin(false);
          }
        } else {
          console.log("No se encontró el documento del usuario");
          setIsAdmin(false);
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    getUserInformation();
  }, [auth]);

  return { isAdmin, loading };
};

export default useUserInformation;
