import React from "react";
import "./Header.css";
import { Nav, NavLink, NavBtn, NavBtnLink } from "./HeaderElements";

const Header = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            src={require("../images/logo.jpg")}
            alt="logo"
            className="logo"
          />
          <h1 className="dog-log">THE DOG LOG</h1>
        </NavLink>
        <NavBtn>
          <NavBtnLink to="/login">Login</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Header;
