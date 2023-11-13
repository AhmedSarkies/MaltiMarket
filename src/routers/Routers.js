import React from "react";

import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Shop,
  ProductDetails,
  Cart,
  Checkout,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import { AddProduct, AllProducts, Dashboard } from "../admin";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/all-products" element={<AllProducts />} />
        <Route path="/dashboard/add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  );
};

export default Routers;
