import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "reactfire";
import { navigationItems } from "./navigationItems";
import AdminRouter from "../Admin/AdminRouter";

const ShopRouter = () => {
  const auth = useAuth();

  return (
    <Routes>
      {navigationItems.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={
            item.isPrivate && !auth.currentUser ? (
              <Navigate to="/home" />
            ) : (
              <item.element />
            )
          }
        />
      ))}
      <Route
        exact
        path="/admin/*"
        element={<AdminRouter />}
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default ShopRouter;
