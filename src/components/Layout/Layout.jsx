import React, { Fragment } from "react";

import { Header, Footer } from "../../components";
import Routers from "../../routers/Routers";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
