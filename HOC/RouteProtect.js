import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const RouteProtect = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // GetAndSet();
  }, []);

  const GetAndSet = async () => {
    const token = await Cookies.get("token");
    const user = await Cookies.get("user");

    if (token && user) setIsLoggedIn(true);
  };

  return isLoggedIn ? children : null;
};

export default RouteProtect;
