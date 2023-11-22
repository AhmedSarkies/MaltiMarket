import React, { Fragment, useEffect, useRef } from "react";

import { Container, Row } from "reactstrap";

import useAuth from "../hooks/useAuth";

import "../styles/admin-nav.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const adminMenu = [
  {
    display: "Dashboard",
    icon: "ri-dashboard-line",
    path: "/dashboard",
  },
  {
    display: "Add Product",
    icon: "ri-add-circle-line",
    path: "/dashboard/add-product",
  },
  {
    display: "All Products",
    icon: "ri-shopping-bag-line",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    icon: "ri-shopping-cart-line",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    icon: "ri-user-line",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const activeActionsRef = useRef(null);

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
    if (location.pathname === "/dashboard") {
      document.querySelector(".item-1").classList.add("active");
    } else {
      document.querySelector(".item-1").classList.remove("active");
    }
  }, [location.pathname]);

  return (
    <Fragment>
      <header className="admin-header">
        <div className="admin-nav-top">
          <Container>
            <div className="admin-nav-wrapper-top">
              <div className="logo" onClick={() => navigate("/")}>
                <h2>MaltiMarket</h2>
              </div>
              <div className="search-box">
                <input type="text" id="search" placeholder="Search..." />
                <label htmlFor="search">
                  <i className="ri-search-line"></i>
                </label>
              </div>
              <div className="admin-nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <div className="profile">
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser?.photoURL}
                    alt={currentUser?.displayName}
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
                    <div className="action d-flex justify-content-center align-items-center flex-column">
                      <Link to="/">Home</Link>
                      <span className="logout" onClick={logout}>
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin-menu p-0">
        <Container>
          <Row>
            <div className="admin-navigation">
              <ul className="admin-menu-list" ref={navRef}>
                {adminMenu.map((item, idx) => (
                  <li className="admin-menu-item" key={idx}>
                    <NavLink
                      className={({ isActive }) =>
                        (isActive ? "active" : "") + ` item item-${idx + 1}`
                      }
                      to={item.path}
                    >
                      <span>
                        <i className={item.icon}></i>
                      </span>
                      <span>{item.display}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default AdminNav;
