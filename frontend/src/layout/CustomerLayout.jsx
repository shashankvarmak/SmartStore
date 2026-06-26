import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
function CustomerLayout() {
  return (
        <>
      <Navbar />
      <Outlet />
      <Footer />
        </>

  );
}
export default CustomerLayout;