import axios from 'axios';
import { useEffect, useState } from 'react';
import LiEdit from './LiEdit';
import { continueStatement } from '@babel/types';
import { emptyObject } from '@jest/expect-utils';
/**
 * Tekee <li> lainattavat kansion 
 * datasta. Sisältää kirjan poistamis
 * kutsun
 */
const AllList = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [tyyppi, setTyyppi] = useState(null)
    const [nimi, setNimi] = useState(null)
    const [maara, setMaara] = useState(null)
    const [saatavilla, setSaatavilla] = useState(null)

    const handleChange = (e) => {
        /**
         * Numeron sun muut tunnistetaan
         * eri id:eiden avulla, jotka laitetaan
         * ./LiEdit.js tiedostossa input-kentille
         */

        // TODO Tee noista  elseistä toimivat!
        switch(e.target.id){
            case "Saatavilla":
                if(e.target.value !== ""){
                    setSaatavilla(Number(e.target.value));
                } else {
                    alert("Syötä vain numeroita!")
                    e.target.value = e.target.value.slice(0, -1)
                }
                break;
                case "Maara":
                    if(e.target.value !== ""){
                        setMaara(Number(e.target.value));
                    } else {
                        alert("Syötä vain numeroita!")
                    }
                break;
            case "Nimi":
                setNimi(e.target.value)
                break;
            case "Tyyppi":
                setTyyppi(e.target.value);
                break;
        }
    }

    /**
     * Kirjan poistamiseen oleva funktio
     */
    const handleClick = () => {
        if(window.confirm("Haluatko poistaa kirjan?")){
            const data = {id: props.book.id}
            axios.post("http://localhost:3000/api/json-deleteBook", data)
            .catch((error) => {
                console.error("Error sending data:", error)
            })
            props.jsonFunc(); // Päivittää datan
        }
    }

    /**
     * Kirjan muokkausten lähettämiseen
     * tehty funktio
     */
    const changeClick = () => {
        if(isEditing){
            if(window.confirm("Tallennetaanko muutokset?")){
                // Rakentaa datasta lähettävän olion
                const data = {
                    tyyppi: tyyppi,
                    nimi: nimi,
                    maara: maara,
                    saatavilla: saatavilla,
                    id: props.book.id
                  }
                  axios.post("http://localhost:3000/api/json-saveChanges-lainattavat", data)
                  .catch((error) => {
                    console.error("Error sending data:", error)
                })
                props.jsonFunc(); // Päivittää datan

                // Lähettämisen jälkeen data resetoidaan
                setSaatavilla(null);
                setMaara(null)
                setNimi(null)
                setTyyppi(null);
            }
        }
        setIsEditing(!isEditing)
    }
    return(
        <>
        {
            !isEditing ?
                <ul key={props.keyName}>
                    <li>{props.book.tyyppi}</li>
                    <li>{props.book.nimi}</li>
                    <li>{props.book.maara}</li>
                    <li>{props.book.saatavilla}</li>
                    <br/>
                    <li>
                        <button onClick={changeClick}>Muokkaa kirjan tietoja</button>
                        <button onClick={handleClick}>Poista kirja</button>
                    </li>
                </ul>
            :
            <LiEdit
                keyName={props.keyName}
                book={props.book}
                tyyppi={props.book.tyyppi}
                nimi={props.book.nimi}
                maara={props.book.maara}
                saatavilla={props.book.saatavilla}
                handleClick={handleClick}
                changeClick={changeClick}
                handleChange={handleChange}
            />
        }
        </>
    )
}

export const ListItems = (props) => {
    return(
        <div key={"lainattavatKey"}>
            {
                props.books.map(book =>
                    <AllList book={book} keyName={book.nimi} jsonFunc={props.jsonFunc}/>
                )
            }
        </div>
    )
}