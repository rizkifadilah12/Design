import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="" style={{ minHeight: "100vh" }}>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  );
};

export default Layout;
