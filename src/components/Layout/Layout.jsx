import React, { Fragment } from "react";

import { Header, Footer } from "../../components";
import Routers from "../../routers/Routers";

import { AdminNav } from "../../admin";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <Fragment>
      {location.pathname.includes("dashboard") ? <AdminNav /> : <Header />}
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
