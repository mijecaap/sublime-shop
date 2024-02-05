import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useFirebaseApp } from "reactfire";

const AdminPrivateRouter = ({ component: Component, ...rest }) => {
  const firebaseApp = useFirebaseApp();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = firebaseApp.auth().currentUser;

      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        if (idTokenResult.claims.admin) {
          setIsAdmin(true);
        }
      }

      setIsLoading(false);
    };

    checkAdminStatus();
  }, [firebaseApp]);

  if (isLoading) {
    // Puedes mostrar un componente de carga mientras se verifica el estado del usuario
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default AdminPrivateRouter;
