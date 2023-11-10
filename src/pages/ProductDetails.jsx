import React, { useState, useRef, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { motion } from "framer-motion";

import { Col, Container, Row } from "reactstrap";

import { CommonSection, Helmet, ProductsList } from "../components";

import products from "../assets/data/products";

import { addToCart } from "../redux/slices/cartSlice";

import "../styles/product-details.css";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const reviewUser = useRef(null);
  const reviewMessage = useRef(null);

  const product = products.find((product) => product.id === id);
  const {
    productName,
    price,
    description,
    imgUrl,
    avgRating,
    reviews,
    shortDesc,
    category,
    stock,
  } = product;

  const relatedProducts = products.filter(
    (product) => product.category === category
  );

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id,
        productName,
        price,
        imgUrl,
        quantity,
      })
    );
    setQuantity(1);
    toast.success("Product Added Successfully");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please give a rating");
      return;
    }
    const review = {
      username: reviewUser.current.value,
      rating: rating,
      text: reviewMessage.current.value,
    };
    toast.success("Review Submitted Successfully");
    console.log(review);
    reviewUser.current.value = "";
    reviewMessage.current.value = "";
    setRating(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={productName} />
            </Col>
            <Col lg="6">
              <div className="product-details">
                <h1>{productName}</h1>
                <div className="product-rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      {[...Array(5)].map((_, idx) => (
                        <i
                          key={idx}
                          className={`${
                            idx + 1 <= avgRating
                              ? "ri-star-s-fill"
                              : "ri-star-line"
                          }`}
                        ></i>
                      ))}
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product-price">${price}</span>
                  <span className="product-category">Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <div className="add-product-group d-flex align-items-center gap-5">
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-secondary"
                      disabled={quantity === 1}
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      -
                    </button>
                    <button className="btn btn-outline-secondary">
                      {quantity}
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      disabled={stock === quantity}
                      onClick={() =>
                        stock > quantity && setQuantity(quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="shop-btn"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </motion.button>
                </div>
                {stock <= 10 && (
                  <p className="text-danger mt-2">Just {stock} Left</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab-wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "description" && "active-tab"}`}
                  onClick={() => setTab("description")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "review" && "active-tab"}`}
                  onClick={() => setTab("review")}
                >
                  Review ({reviews.length})
                </h6>
              </div>
              {tab === "description" && (
                <div className="tab-content mt-5">
                  <p>{description}</p>
                </div>
              )}
              {tab === "review" && (
                <div className="product-review mt-5">
                  <div className="review-wrapper">
                    <ul>
                      {reviews?.map((review, idx) => (
                        <li key={idx} className="mb-4">
                          <h6>{review.username}</h6>
                          <span>{review.rating} (rating)</span>
                          <p>{review.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review-form">
                      <h4>Leave Your Experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <div className="form-group rating-group d-flex justify-content-center align-items-center">
                            {[...Array(5)].map((_, idx) => (
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() =>
                                  rating === idx + 1
                                    ? setRating(idx)
                                    : setRating(idx + 1)
                                }
                                key={idx}
                              >
                                {idx + 1}
                                <i
                                  className={`${
                                    idx + 1 <= rating
                                      ? "ri-star-s-fill"
                                      : "ri-star-line"
                                  }`}
                                ></i>
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        <div className="form-group">
                          <textarea
                            rows={4}
                            placeholder="Review Message ..."
                            ref={reviewMessage}
                            required
                          />
                        </div>
                        <div className="submit-container">
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            className="shop-btn"
                            type="submit"
                          >
                            Submit
                          </motion.button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related-title">You Might Also Like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
