import React, { Fragment } from "react";

import { Container, Row } from "reactstrap";

import useAuth from "../hooks/useAuth";

import "../styles/admin-nav.css";
import { NavLink } from "react-router-dom";

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

  return (
    <Fragment>
      <header className="admin-header">
        <div className="admin-nav-top">
          <Container>
            <div className="admin-nav-wrapper-top">
              <div className="logo">
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
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin-menu p-0">
        <Container>
          <Row>
            <div className="admin-navigation">
              <ul className="admin-menu-list">
                {adminMenu.map((item, idx) => (
                  <li className="admin-menu-item" key={idx}>
                    <NavLink
                      className={({ isActive }) =>
                        (isActive ? "active" : "") + " item"
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
