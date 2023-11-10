import React from "react";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";

import { Helmet, CommonSection } from "../components";

import "../styles/checkout.css";

const Checkout = () => {
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
            <Col lg="4"></Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
