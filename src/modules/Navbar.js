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
<Outlet />
</>
    );
}

export default Navbar;