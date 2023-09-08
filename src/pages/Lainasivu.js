//import React from "react"
///import "./Lainasivu.css"

//function Lainasivu(){
   // return(
        //<div>
           // <h1>Täällä lainataan</h1>
        //</div>
   // );
//}

import React from "react"
import "./Etusivu.css"
import { Link } from "react-router-dom"

function Lainasivu(){
    return(
        <div className="content">
            <h1>Lainaa Täältä</h1>
            <p>"Skannaa" nappia painamallla voit kätevästi ja nopeasti lainata tuotteesi<br>
            </br> <br></br> </p>
            
            <Link to="/login">
                <button type="button" ><span></span>Skannaa Tästä</button>
            </Link>
        </div>
    );
}

export default Etusivu;