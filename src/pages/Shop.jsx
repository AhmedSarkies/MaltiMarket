import React, { useState } from "react";

import { CommonSection, Helmet, ProductsList } from "../components";
import { Col, Container, Row } from "reactstrap";

import products from "../assets/data/products";

import "../styles/shop.css";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filteredValue = e.target.value;
    if (filteredValue === "all") {
      setProductsData(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === filteredValue
      );
      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section className="shop-products-container">
        <Container>
          <Row>
            <Col lg="6" md="12" className="mb-3 mb-lg-0">
              <div className="d-flex align-items-center justify-content-between">
                <Col lg="4" md="6">
                  <div className="filter-widget">
                    <select onChange={handleFilter}>
                      <option value="all">Filter By Category</option>
                      <option value="all">All</option>
                      <option value="sofa">Sofa</option>
                      <option value="mobile">Mobile</option>
                      <option value="chair">Chair</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </div>
                </Col>
                <Col lg="4" md="6" className="text-lg-start text-end">
                  <div className="filter-widget">
                    <select>
                      <option value="ascending">Sort By</option>
                      <option value="ascending">Ascending</option>
                      <option value="descending">Descending</option>
                    </select>
                  </div>
                </Col>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No Products Are Found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
