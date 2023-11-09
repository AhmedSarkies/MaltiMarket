import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Shop,
  ProductDetails,
  Cart,
  Checkout,
} from "../pages";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default Routers;
