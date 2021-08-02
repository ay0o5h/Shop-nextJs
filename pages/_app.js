import Cookies from "js-cookie";

import "../styles/antStyle.css";
import "../styles/globals.scss";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
     getAndSet();
  }, []);

  const getAndSet = async () => {
    const token = await Cookies.get("token");

    if (!token && window.location.pathname !== "/login") {
      if (
        window.location.pathname == "/register" ||
        window.location.pathname == "/forgotPassword"
      )
        return;
      window.location.href = "/login";
    }

    if (token && window.location.pathname == "/login")
      window.location.href = "/";
  };

  return <Component {...pageProps} />;
}

export default MyApp;
