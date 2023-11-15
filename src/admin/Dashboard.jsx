import React, { Fragment } from "react";

import { Col, Container, Row } from "reactstrap";

import useGetData from "../hooks/useGetData";

import "../styles/dashboard.css";

const Dashboard = () => {
  const { data: products } = useGetData("products");
  const { data: orders } = useGetData("orders");
  const { data: users } = useGetData("users");

  return (
    <Fragment>
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <div className="revenue-box">
                <h5>Total Sales</h5>
                <span>
                  ${products?.reduce((acc, curr) => acc + curr.price, 0) || 0}
                </span>
              </div>
            </Col>
            <Col lg="3">
              <div className="orders-box">
                <h5>Order</h5>
                <span>
                  {orders?.reduce((acc, curr) => acc + curr.quantity, 0) || 0}
                </span>
              </div>
            </Col>
            <Col lg="3">
              <div className="products-box">
                <h5>Total Products</h5>
                <span>{products?.length}</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="users-box">
                <h5>Total Users</h5>
                <span>{users?.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Dashboard;
