import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { toast } from "react-toastify";

import "../../styles/product-card.css";

const ProductCard = ({ product }) => {
  const { id, productName, category, imgUrl, price } = product;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addItem({
        id: product.id,
        productName: product.productName,
        image: product.imgUrl,
        price: product.price,
      })
    );
    toast.success("Product Added Successfully");
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product-card">
        <div className="product-img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={imgUrl}
            alt={productName}
          />
        </div>
        <div className="product-info p-2">
          <h3 className="product-name">
            <Link to={`/shop/${id}`}>{productName}</Link>
          </h3>
          <span>{category}</span>
        </div>
        <div className="product-card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="product-price">${price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCartHandler}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
