import { useState } from "react";
import axios from 'axios';
import { file } from "@babel/types";

/**
 * Sisältää koodin joka
 * sallii uuden kirjan
 * lisäämisen.
 * 
 * 
 * TODO Lisää kansikuva näkyviin img tagiin
*/

export const AddBook = (props) => {
    // const [showPanel, setShowPanel] = useState(false)    
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState("Kirja")
    const [availability, setAvailability] = useState(0);
    const [kansiKuva, setKansiKuva] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    /**
     * Ottaa <select>:istä
     * arvon joka otetaan
     * tyypiksi
     * 
     */
    const handleSelect = (e) => {
        setType(e.target.value)
    }

    // Ottaa <input file=""/> kuvan
    const handleImage = (e) => {
        const file = e.target.files[0];
        const maxSizeInBytes = 1024 * 1024; // 1 MB (adjust as needed)
      
        if (file && file.size > maxSizeInBytes) {
            // TODO testaa tätä if-lausetta, koska on niin laittomasti pöllittyä koodia
            alert('Tiedosto on suurempi kuin 1MT.');
            e.target.value = null; // Clear the input field
        } else {
            setKansiKuva(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);
            };
            reader.readAsDataURL(file);
            setKansiKuva(file);
        }
      };
    /**
     * Tekee ja lähettää datan
     * NodeJS palvelimelle joka
     * lisää sen Lainattavt.json:iin
     */
    const handleClick = (e) => {
        e.preventDefault();
        if(!window.confirm("Lisätäänkö uusi kirja")){
            return;
        }
        if(isNaN(amount) || isNaN(availability)){
            console.error("Put only numbers")
            alert("Laita vain numeroita Määrä ja Saatavilla kenttiin")
            return;
        }
        if (!kansiKuva) {
            console.error('No image selected');
            alert("Lisää kansikuva. Suurin sallittu koko: 1MT")
            return;
        }
        const bookObj = {
          "tyyppi": type,
          "nimi": name,
          "maara": Number(amount),
          "saatavilla": Number(availability),
          "id": props.jsonData.length - 1 // Laittaa kirjan id:ksi sijainnin listassa
        };
        
        axios.post("http://localhost:3000/api/json-addBook", bookObj)
        .catch((error) => {
            console.error("Error reaching server:", error);
        });

        const formData = new FormData();
        formData.append('image', kansiKuva);
        formData.append('name', name)
        axios.post('http://localhost:3000/api/json-addBook-coverImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .catch((error) => {
            console.error("Error reaching server:", error);
        });;
          props.jsonFunc(); // Päivittää datan
      }

    return(
        <>
                <div>
                    <input placeholder="Kirjan nimi" onChange={(e) => {setName(e.target.value)}} />
                    <input placeholder="Määrä" onChange={(e) => {setAmount(e.target.value)}} />
                    <input placeholder="Saatavilla" id="avaiability-input-field" onChange={(e) => {setAvailability(e.target.value)}} />
                    <select onChange={handleSelect}>
                        <option value={"Kirja"}>Kirja</option>
                        <option value={"Joku muu"}>Joku muu</option>
                    </select>
                    <img src={imageUrl} alt="Kansikuva" />
                    <label htmlFor="fileInput">Kirjan kansikuva:</label>
                    <input accept="image/*" type="file" id="fileInput" onChange={handleImage}/>

                    <button onClick={handleClick}>
                        Lisää kirja
                    </button>
                </div>

</>
    )
}
/*
<button onClick={() => {setShowPanel(!showPanel)}}>Kirjanlisäyspaneeli</button>
    // showPanel ?
    :
    <></>
}

*/