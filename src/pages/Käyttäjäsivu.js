import React from "react"
import "./Käyttäjäsivu.css"
import Userinfo from "../Databases/käyttäjät/Users.json"
var string = require("randomstring")
var User = (1)

function Käyttäjäsivu(){
    return(
        <div className="content">
            <div className="Käyttäjäinfo">
                <h1>{Userinfo[User].sposti}</h1>
                <p>{Userinfo[User].salasana}</p>
                <p>{Userinfo[User].lainat}</p>

            </div>
            <div className="Lainat">   
                
                
            </div>
            <div className="Nappi">
                <button type="button" onClick={function(){
                    var Uusilaina = 
                    {
                        "lainaaja": "",
                        "lainauspv": "05/09/2023",
                        "viimpalautuspv": "05/10/2023",
                        "palautettupv":"Ei Palautettu",
                        "nimi":"Fysiikka 101",
                        "tunniste":"DjAd",
                        "palautettu":"false"
                    }
                    JSON.stringify(Uusilaina)
                }}><span></span>Lainaa</button>
            </div>
        </div>

    );
}

export default Käyttäjäsivu;