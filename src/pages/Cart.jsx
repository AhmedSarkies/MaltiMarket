import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  deleteFromCart,
  deleteItemFromCart,
} from "../redux/slices/cartSlice";

import { motion } from "framer-motion";

import { Container, Row, Col } from "reactstrap";

import { Helmet, CommonSection } from "../components";

import "../styles/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalAmount } = useSelector((state) => state.cart);

  return (
    <Helmet title={"Cart"}>
      <CommonSection title={"Shopping Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cart?.length === 0 ? (
                <h2 className="fs-4 text-center">No Item Added To The Cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((item) => {
                      const {
                        id,
                        imgUrl,
                        productName,
                        price,
                        quantity,
                        stock,
                      } = item;
                      return (
                        <tr key={id}>
                          <td>
                            <img src={imgUrl} alt={productName} />
                          </td>
                          <td>
                            <Link to={`/shop/${id}`}>{productName}</Link>
                          </td>
                          <td>${price}</td>
                          <td>{quantity}px</td>
                          <td>
                            <div className="add-product-group d-flex align-items-center gap-4">
                              <div className="btn-group">
                                <button
                                  className="btn btn-outline-secondary"
                                  onClick={() => dispatch(deleteFromCart(id))}
                                >
                                  -
                                </button>
                                <button className="btn btn-outline-secondary">
                                  {quantity}
                                </button>
                                <button
                                  className="btn btn-outline-secondary"
                                  disabled={quantity === stock}
                                  onClick={() => {
                                    dispatch(
                                      addToCart({ ...item, quantity: 1 })
                                    );
                                  }}
                                >
                                  +
                                </button>
                              </div>
                              <motion.i
                                whileTap={{ scale: 1.3 }}
                                className="ri-delete-bin-line text-danger d-inline-flex fs-5"
                                onClick={() => dispatch(deleteItemFromCart(id))}
                              ></motion.i>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex justify-content-between align-items-center">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <motion.button
                  whileTap={{ scale: 1.08 }}
                  className="shop-btn w-100"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </motion.button>
                <motion.button
                  whileTap={{ scale: 1.08 }}
                  className="shop-btn w-100 mt-3"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
