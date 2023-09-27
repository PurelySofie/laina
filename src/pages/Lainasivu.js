import React, { useEffect, useState } from "react"
import "./Lainasivu.css"
import axios from "axios"

function Lainasivu(){
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:3000/api/json-lainattavat")
        .then((response) => {
            setJsonData(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching JSON data:', error);
        });
    }, [])

    // Katsoo lataako sivusto tietoja
    if(loading){
        return(
            <div className="content">
                <p>Tietoja ladataan...</p>
            </div>
        )
    }

    /*
        <img src={`/images/${kirjanNimi}.jpeg`} alt='Kirjan kansikuva'></img>
    */
    return(
        <div className="content">
            <div className="container">
                {
                    // Looppaa datan läpi, etsien Lainattavat.json tiedoston
                    jsonData.map(books =>
                        books[0] === "Lainattavat.json"
                        ?
                        // Löydettyään se looppaa sen läpi
                        books[1].map((book, index) => (
                            // Ja tuo kirjan nimen näkyviin
                            <div className="box" key={index} >
                                    <p className="box-text">{book.nimi}</p>
                                    <p className="box-text">Yhteensä {book.maara}Kpl</p>
                                    <p className="box-text">{book.saatavilla}Kpl jäljellä</p>
                                </div>
                            ))
                            :
                            <></>
                    )
                }

            </div>
            <form action="Scanner">
            <button type="submit"  ><span></span>QR-Koodi lukija</button>

            </form>
        </div>
        );



}


export default Lainasivu;