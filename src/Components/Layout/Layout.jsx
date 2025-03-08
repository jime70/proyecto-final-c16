import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ErrorBoundary from "../ErrorBoundary";

const Layout = () => {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default Layout;
