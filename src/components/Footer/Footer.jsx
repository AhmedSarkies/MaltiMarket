import React from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="6" className="mb-4">
            <div className="logo">
              <div>
                <h1 className="text-white">MaltiMarket</h1>
              </div>
            </div>
            <p className="footer-text mt-4">
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed
            </p>
          </Col>
          <Col lg="3" md="3" className="mb-4">
            <div className="footer-quick-links">
              <h4 className="quick-links-title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phone</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="footer-quick-links">
              <h4 className="quick-links-title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="4">
            <div className="footer-quick-links">
              <h4 className="quick-links-title">Contact</h4>
              <ListGroup className="footer-contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>Cairo, Egypt</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>+201091234567</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>example@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer-copyright">
              Copyright &copy; {year} Developed By Ahmed Sarkies. All Right
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
