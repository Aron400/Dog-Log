import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

//full header
export const Nav = styled.nav`
  background: #060b26;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

//logo and name
export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 1rem;
  height: 100%;
  cursor: pointer;
  // &.active {
  //   color: #15cdfc;
  // }
`;

//login
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
`;

//login link
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: white;
  padding: 10px 22px;
  color: #060b26;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: orange;
  }
  margin-left: 24px;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
