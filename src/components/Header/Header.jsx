import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Container, Row } from "reactstrap";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import "./header.css";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/shop",
    display: "Shop",
  },
  {
    path: "/cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cart);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky");
      } else {
        headerRef.current.classList.remove("sticky");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const menuToggle = () => {
    menuRef.current.classList.toggle("active-menu");
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav-wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>MaltiMarket</h1>
                {/* <p>Since 1990</p> */}
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <span className="close-menu-btn">+</span>
              <ul className="menu">
                {navLinks.map(({ path, display }, idx) => (
                  <li className="nav-item" key={idx}>
                    <NavLink
                      to={path}
                      className={(navClass) =>
                        navClass.isActive ? "nav-active" : ""
                      }
                    >
                      {display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-icons">
              <span className="fav-icon">
                <i className="ri-heart-line"></i>
                <span className="badge">0</span>
              </span>
              <span className="cart-icon" onClick={() => navigate("/cart")}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <span>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={userIcon}
                  alt="user"
                />
              </span>
              <div className="mobile-menu">
                <span className="mobile-menu" onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
