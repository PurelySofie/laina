import React from "react";
import { Outlet, Link} from "react-router-dom";

function Navbar() {
    return (
        <>
        <ul>
            <li>
                <Link to="/">Etusivu</Link>
            </li>
            <li>
                <Link to="/Lainasivu">Lainasivu</Link>
            </li>
            <li>
                <Link to="/Loginsivu">Loginsivu</Link>
            </li>
            <li>
                <Link to="/Adminsivu">Adminsivu</Link>
            </li>
        </ul>

<Outlet />
</>
    );
}

export default Navbar;