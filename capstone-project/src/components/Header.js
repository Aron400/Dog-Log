import React from "react";
import "./Header.css";
import SideNavbar from "./side-navbar";
import { Nav, NavLink, NavBtnLink } from "./HeaderElements";

const Header = () => {
  return (
    <div className="header">
      <Nav>
        <div className="side-bar"><SideNavbar /></div>
        <NavLink to="/">
          <img
            src={require("../images/logoandimage2.png")}
            alt="logo"
            className="logo"
          />
          {/* <h1 className="dog-log">THE DOG LOG</h1> */}
        </NavLink>
        <div className="login-button">
          <NavBtnLink to="/login">Login</NavBtnLink>
        </div>
      </Nav>
    </div>
  );
};

export default Header;
