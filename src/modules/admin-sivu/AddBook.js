import { useState } from "react";
import axios from 'axios';

/**
 * Sisältää koodin joka
 * sallii uuden kirjan
 * lisäämisen.
*/

export const AddBook = (props) => {
    const [showPanel, setShowPanel] = useState(false)    
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)
    const [book, setBook] = useState({})
    const [type, setType] = useState("Kirja")
    const [availability, setAvailability] = useState(0);
    /**
     * Ottaa <select>:istä
     * arvon joka otetaan
     * tyypiksi
     * 
     */
    const handleSelect = (e) => {
        setType(e.target.value)
    }
    /**
     * Tekee ja lähettää datan
     * NodeJS palvelimelle joka
     * lisää sen Lainattavt.json:iin
     */
    const handleClick = () => {
        if(isNaN(amount) || isNaN(availability)){
            return;
        }
        const bookObj = {
          "tyyppi": type,
          "nimi": name,
          "maara": Number(amount),
          "saatavilla": Number(availability),
          "id": props.jsonData.length - 1 // Laittaa kirjan id:ksi sijainnin listassa
        };
        setBook(bookObj)
        axios.post("http://localhost:3000/api/json-addBook", bookObj)
          .catch((error) => {
            console.error("Error reaching server:", error);
          });
          props.jsonFunc(); // Päivittää datan
      }
      
    return(
        <>
            <button onClick={() => {setShowPanel(!showPanel)}}>Kirjanlisäyspaneeli</button>
            {
                showPanel ?
                <div>
                    <input placeholder="Kirjan nimi" onChange={(e) => {setName(e.target.value)}} />
                    <input placeholder="Määrä" onChange={(e) => {setAmount(e.target.value)}} />
                    <input placeholder="Saatavilla" id="avaiability-input-field" onChange={(e) => {setAvailability(e.target.value)}} />
                    <select onChange={handleSelect}>
                        <option value={"Kirja"}>Kirja</option>
                        <option value={"Joku muu"}>Joku muu</option>
                    </select>
                    <button onClick={handleClick}>
                        Lisää kirja
                    </button>
                </div>
                :
                <></>
            }

        </>
    )
}
