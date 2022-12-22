import React from "react";
import "./Header.css";
import SideNavbar from "./side-navbar";
import { Nav, NavLink, NavBtnLink } from "./HeaderElements";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		navigate("/login");
	};
	return (
		<div className="header">
			<Nav>
				<div className="side-bar">
					<SideNavbar />
				</div>
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
					<NavBtnLink onClick={logout} to="/login">
						Logout
					</NavBtnLink>
				</div>
			</Nav>
		</div>
	);
};

export default Header;
