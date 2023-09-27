import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "./Käyttäjäsivu.css"
import Userinfo from '../databases/käyttäjät/Users.json';
var string = require("randomstring")
var User = (1)

function Käyttäjäsivu(){

    const navigate = useNavigate();
    const { sposti } = useParams();

    // Kirjaudu Ulos
    const kirjauduUlos = () => {
        axios.get('http://localhost:3030/kayttajat',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
            localStorage.setItem('token', "")
           navigate("/login");
        })
        .catch((e) => {
            console.log(e)
        });
    }

    return(
        <div className="content">
            <div className="Käyttäjäinfo">
                <h1>{sposti}</h1>

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
            <div className="kirjaudu-ulos">
                <a onClick={()=>kirjauduUlos()} className="kirjaudu-ulos " aria-current="page" href="#">Kirjaudu Ulos</a>
            </div>

        </div>

    );
}

export default Käyttäjäsivu;