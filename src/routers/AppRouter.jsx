import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ShopLayout from "./shop/ShopLayout";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to={"/home"} />} />
        <Route exact path="/*" element={<ShopLayout />} />
      </Routes>
    </>
  );
};

export default AppRouter;
