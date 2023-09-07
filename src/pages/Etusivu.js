import React from "react"
import "./Etusivu.css"
import { Link } from "react-router-dom"

function Etusivu(){
    return(
        <div className="content">
            <h1>Lainaa tarvittavasi helposti</h1>
            <p>Kirjaudu sisään ennen lainaamista, se helpottaa lainaamisen etenemistä sujuvasti ja ongelmitta<br>
            </br> voit käyttää qr-koodin lukijaa löytääksesi lainattavasi helpommin.<br></br> Käytä grandian tunnuksia kirjautumisessa.</p>

            <Link to="/login">
                <button type="button" ><span></span>Kirjaudu sisään</button>
            </Link>
        </div>
    );
}

export default Etusivu;