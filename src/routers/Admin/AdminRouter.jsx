import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth, useFirestore } from "reactfire";
import AdminOrder from "../../pages/AdminOrder/AdminOrder";
import { useUserInformation } from "../../hooks";
import { Loader } from "../../components";
import { adminNavigationItems } from "./adminNavigationItems";

const AdminRouter = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const { isAdmin, loading } = useUserInformation(auth, firestore);

  if (loading) {
    return <Loader />;
  }
  return (
    <Routes>
      {adminNavigationItems.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={
            !isAdmin || !auth.currentUser ? (
              <Navigate to="/home" />
            ) : (
              <item.element />
            )
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="orders/:orderId" element={<AdminOrder />} />
    </Routes>
  );
};

export default AdminRouter;
