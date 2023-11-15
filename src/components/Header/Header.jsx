import React, { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Container, Row } from "reactstrap";

import useAuth from "../../hooks/useAuth";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import "./header.css";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

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
  const { currentUser } = useAuth();
  const activeActionsRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef?.current?.classList.add("sticky");
      } else {
        headerRef?.current?.classList.remove("sticky");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav-wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>MaltiMarket</h1>
                <p>Since 1990</p>
              </div>
            </div>
            <div
              className="navigation"
              ref={menuRef}
              onClick={() => menuRef.current.classList.toggle("active-menu")}
            >
              <span className="close-menu-btn">+</span>
              <ul className="menu">
                {navLinks.map(({ path, display }, idx) => (
                  <li className="nav-item" key={idx}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive ? "nav-active" : ""
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
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL ? currentUser.photoURL : userIcon}
                  alt={
                    currentUser?.displayName ? currentUser.displayName : "user"
                  }
                  onClick={() =>
                    activeActionsRef.current.classList.toggle("active")
                  }
                />
                <div
                  className="profile-actions"
                  ref={activeActionsRef}
                  onClick={() =>
                    activeActionsRef.current.classList.toggle("active")
                  }
                >
                  {currentUser?.photoURL ? (
                    <div className="action d-flex justify-content-center align-items-center flex-column">
                      <Link to="/dashboard">Dashboard</Link>
                      <span className="logout" onClick={logout}>
                        Logout
                      </span>
                    </div>
                  ) : (
                    <div className="action d-flex justify-content-center align-items-center flex-column">
                      <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile-menu">
                <span
                  className="mobile-menu"
                  onClick={() =>
                    menuRef.current.classList.toggle("active-menu")
                  }
                >
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
