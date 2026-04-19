import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import "./css/Layout.css";

function Layout({ sidebar, header, children }) {
  return (
    <div className="container-all">
      {sidebar}
      <div className="internal-container">
        {header}
        <main>{children}</main>
      </div>
    </div>
    // page protection
  );
}
export default Layout;
