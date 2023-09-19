import React, { useEffect, useState } from "react"
import "./Käyttäjäsivu.css"
import Userinfo from "../databases/users/Users.json"
import axios from 'axios';
var User = (1)

function Käyttäjäsivu(){
    
    const [UserData, setUserData] = useState([])
    const [lainatData, setLainatData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/json-users') // Tekee pyynnön kyseiseen nettiosoitteeseen
        .then((response) => {
            setUserData(response.data); // Lisää datan lainatData:aan
        })
        .catch((error) => {
            console.error('Error fetching JSON data:', error);
        });
    }, []);


    useEffect(() => {
        axios.get('http://localhost:3000/api/json-lainat') // Tekee pyynnön kyseiseen nettiosoitteeseen
        .then((response) => {
            setLainatData(response.data); // Lisää datan lainatData:aan
        })
        .catch((error) => {
            console.error('Error fetching JSON data:', error);
        });
    }, []);

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