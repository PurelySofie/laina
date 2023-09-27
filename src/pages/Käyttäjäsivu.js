import React, { useEffect, useState } from "react"
import "./Käyttäjäsivu.css"
import axios from 'axios'
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
                <p>Tähän tulee käyttäjän omat lainat näkyviin kun on kirjautunut.</p>
            </div>
            <div className="Lainat">   
                
                
            </div>
        </div>

    );
}

export default Käyttäjäsivu;