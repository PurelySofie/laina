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
        {/**
         * Vaihoin noi class="" => className="" koska tuli consoleen erroria
         * Toi onclicki pitäis myös olla tällee onClick={funktioNimi} 👍👍👍
         */}
        <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <ul className="mobile-menu">
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