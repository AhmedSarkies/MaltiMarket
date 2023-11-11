import React from "react";

import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";

import { Helmet, CommonSection } from "../components";

import "../styles/checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { totalQuantity, totalAmount, cart } = useSelector(
    (state) => state.cart
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Helmet title={"Checkout"}>
      <CommonSection title={"Checkout"} />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold fs-4">Billing Details</h6>
              <Form className="billing-form">
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street Address"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Zip Code"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Order Notes"
                  ></textarea>
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout-cart">
                <h6>
                  Total Items:{" "}
                  <span>
                    {totalQuantity}
                    {totalQuantity === 0
                      ? null
                      : totalQuantity === 1
                      ? " Item"
                      : " Items"}
                  </span>
                </h6>
                <h6>
                  Total Qty:{" "}
                  <span>
                    {totalItems}
                    {totalItems === 0
                      ? null
                      : totalItems === 1
                      ? " Item"
                      : " Items"}
                  </span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    free shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <motion.button
                  whileTap={{ scale: 1.08 }}
                  className="shop-btn auth-btn fw-bold w-100"
                  onClick={() => navigate("/login")}
                >
                  Place An Order
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
