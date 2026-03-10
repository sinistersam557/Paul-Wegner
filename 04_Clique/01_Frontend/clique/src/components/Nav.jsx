import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/clique_logo.svg";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Nav = () => {
  return (
    <div className="nav-container">
      <ul>
        <li className="logo">
          <NavLink to="/">
            <img src={logo} alt="Application logo" height="20" />
          </NavLink>
        </li>

        <SignedOut>
          <li>
            <SignInButton afterSignInUrl="/" />
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <NavLink to="/cliques">Cliques</NavLink>
          </li>
          <li>
            <NavLink to="/userprofile">User Profile</NavLink>
          </li>
          <li>
            <UserButton afterSignOutUrl="/" />
          </li>
        </SignedIn>
        
      </ul>
    </div>
  );
};

export default Nav;
