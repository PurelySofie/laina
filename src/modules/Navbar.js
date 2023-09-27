import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className={`navbar ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-list ${isMobileMenuOpen ? "show" : ""}`}>
          <li>
            <Link to="/">Etusivu</Link>
          </li>
          <li>
            <Link to="/lainaa">Lainasivu</Link>
          </li>
          <li>
            <Link to="/admin">Adminsivu</Link>
          </li>
          <li>
            <Link to="/login">Kirjaudu sisään</Link>
          </li>
          <li>
            <Link to="/userpage">Omat lainat</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
