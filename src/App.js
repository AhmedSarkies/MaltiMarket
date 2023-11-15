import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Layout } from "./components";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {@
    window.scrollTo(0, 0);
    if (location.pathname.endsWith("/")) {
      for (let i = location.pathname.length - 1; i >= 0; i--) {
        if (location.pathname[i] === "/") {
          navigate(location.pathname.slice(0, i));
          break;
        }
      }
    }
  }, [location.pathname, navigate]);
  return <Layout />;
}

export default App;
