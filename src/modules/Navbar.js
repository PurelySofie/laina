import React from "react"
import { Outlet, Link} from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    return (
        <>
        <div className="banner">
            <div className="navbar">
                <ul>
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
        </div>
        <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <ul class="mobile-menu">
          <li><a href="/home">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About</a></li>
          <li id="login"><a href="/login" >Login</a></li>
          <li id="signup"><a href="/signup">Signup</a></li>
        </ul>
      </div>
      <div> <script src="navbarm.js"></script></div>
<Outlet />
</>
    );
}

export default Navbar;