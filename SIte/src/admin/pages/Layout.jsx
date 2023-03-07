import React from "react";
import Topbar from "../components/Navbar";
import Sidebar1 from "../components/Sidebar";
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Topbar />
      <div className="columns " style={{ minHeight: "100vh" }}>
        <div className=" is-3">
          <Sidebar1 />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
