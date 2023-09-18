import React from "react"
import "./Käyttäjäsivu.css"
import Userinfo from "../databases/käyttäjät/Users.json"
import Laina from "../databases/lainat/1zh7a.json"
var string = require("randomstring");

function Käyttäjäsivu(){
    return(
        <div className="Lainat">
            <p>{string.generate(5)}</p>
            <h1>{Userinfo[0].sposti}</h1>
            <p>{Laina.tunniste}</p>
        </div>
    );
}

export default Käyttäjäsivu;