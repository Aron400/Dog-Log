import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

//full header
export const Nav = styled.nav`
  background: #2a3d52;
  height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
`;

//logo/name
export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  display: inline-block;
  margin: 0 auto;
  height: 100%;
  cursor: pointer;
  // &.active {
  //   color: #15cdfc;
  // }
`;

//login link
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: white;
  padding: 12px 32px;
  color: black;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #c97757;
    color: white;
  }
  margin-left: 24px;
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 10px;
    right: 0;
    transform: translate(-30%, 20%);
  }

  margin: 0;
  position: absolute;
  top: 5%;
  // -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;
