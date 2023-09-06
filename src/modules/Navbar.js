import React from "react"
import { Outlet, Link} from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    return (
        <>
        <div className="banner">
            <div class="navbar">
                <ul>
                    <li>
                        <Link to="/">Etusivu</Link>
                    </li>
                    <li>
                        <Link to="/Lainasivu">Lainasivu</Link>
                    </li>
                    <li>
                        <Link to="/Adminsivu">Adminsivu</Link>
                    </li>
                    <li>
                        <Link to="/Loginsivu">Kirjaudu sisään</Link>
                    </li>
                </ul>
            </div>
        </div>
<Outlet />
</>
    );
}

export default Navbar;