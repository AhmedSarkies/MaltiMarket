import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { Container, Row, Col, Spinner } from "reactstrap";

import { Helmet, Services, ProductsList, Clock } from "../components";

import heroImg from "../assets/images/hero-img.png";
import counterImg from "../assets/images/counter-timer-img.png";

import useGetData from "../hooks/useGetData";

import "../styles/home.css";

const Home = () => {
  const { data: products, loading } = useGetData("products");
  const year = new Date().getFullYear();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (product) => product.category === "chair"
    );
    const filteredBestSalesProducts = products.filter(
      (product) => product.category === "sofa"
    );
    const filteredMobileProducts = products.filter(
      (product) => product.category === "mobile"
    );
    const filteredWirelessProducts = products.filter(
      (product) => product.category === "wireless"
    );
    const filteredPopularProducts = products.filter(
      (product) => product.category === "watch"
    );
    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero-content">
                <p className="hero-subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor
                  sit amet, consectetur adip lorem ipsum dolor sit amet,
                  consectetur
                </p>
                <Link to={"/shop"}>
                  <motion.button whileTap={{ scale: 1.1 }} className="shop-btn">
                    SHOP NOW
                  </motion.button>
                </Link>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero-img">
                <img src={heroImg} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending-products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title mb-5">Trending Products</h2>
            </Col>
            {loading ? (
              <div className="text-center">
                <Spinner className="spinner" />
              </div>
            ) : (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>
      <section className="best-sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title mb-5">Best Sales</h2>
            </Col>
            {loading ? (
              <div className="text-center">
                <Spinner className="spinner" />
              </div>
            ) : (
              <ProductsList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>
      <section className="timer-count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count-down-col">
              <div className="clock-top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <Link to={"/shop"}>
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="shop-btn store-btn"
                >
                  Visit Store
                </motion.button>
              </Link>
            </Col>
            <Col lg="6" md="12" className="counter-img text-end">
              <img src={counterImg} alt="counter" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new-arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title mb-5">New Arrivals</h2>
            </Col>
            {loading ? (
              <div className="text-center">
                <Spinner className="spinner" />
              </div>
            ) : (
              <Fragment>
                <ProductsList data={mobileProducts} />
                <ProductsList data={wirelessProducts} />
              </Fragment>
            )}
          </Row>
        </Container>
      </section>
      <section className="popular-category">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title mb-5 pb-3">Popular In Category</h2>
            </Col>
            {loading ? (
              <div className="text-center">
                <Spinner className="spinner" />
              </div>
            ) : (
              <ProductsList data={popularProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
