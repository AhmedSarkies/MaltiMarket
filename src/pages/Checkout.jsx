import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";

import { Helmet, CommonSection } from "../components";

import "../styles/checkout.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import useGetData from "../hooks/useGetData";
import useAuth from "../hooks/useAuth";
import { deleteCart } from "../redux/slices/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const { totalQuantity, totalAmount, cart } = useSelector(
    (state) => state.cart
  );
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const { user } = useSelector((state) => state.auth);
  const {
    currentUser: { uid, displayName, email },
  } = useAuth();
  const dispatch = useDispatch();

  // Add Order to Firebase
  const order = {
    userId: uid,
    userName: displayName,
    userEmail: email,
    products: cart,
    orderNotes,
    totalQuantity,
    totalAmount,
    createdAt: serverTimestamp(),
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart) {
      try {
        await addDoc(collection(db, "orders"), order);
        toast.success("Order placed successfully");
        dispatch(deleteCart());
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

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
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) =>
                      phone >= 0 ? setPhone(e.target.value) : setPhone("")
                    }
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={(e) =>
                      zipCode >= 0 ? setZipCode(e.target.value) : setZipCode("")
                    }
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Order Notes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  ></textarea>
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout-cart">
                <h6>
                  Total Items:
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
                  Total Qty:
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
                  onClick={handlePlaceOrder}
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
