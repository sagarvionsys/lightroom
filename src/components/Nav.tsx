"use client";

import React, { useEffect, useState } from "react";
import Navbar_MT from "./Navbar-Mobile";
import { Navbar } from "./Navbar";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 725);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <Navbar_MT /> : <Navbar />;
};

export default Nav;
