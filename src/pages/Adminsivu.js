import React, { useState } from 'react'
import "./Adminsivu.css"

// Module importit
// Jos näyttää punasta viivaa nii pitäis silti toimia
import ListItems from '../modules/admin-sivu/ListItems';
import SearchBar from '../modules/admin-sivu/SearchBar';

/**
 * JSON IMPORT
 */
// import data from"../databases/lainattavat/";


/**
 * Väliaikainen data
 *  I
 *  I
 *  V
 */
const data = [
    {
      "lainaaja": "Sauli Niinistö",
      "lainauspv": "05/09/2023",
      "viimpalautuspv": "05/10/2023",
      "palautettupv":"Ei Palautettu",
      "Kirjanimi":"Testikirja",
      "Kirjatunnitse":"a81hRd4mOF29b"
    },
    {
        "lainaaja": "Sauli Liinnistö",
        "lainauspv": "05/09/2023",
        "viimpalautuspv": "05/10/2023",
        "palautettupv":"Ei Palautettu",
        "Kirjanimi":"Sähkö ja ICT perusteet",
        "Kirjatunnitse":"a8hdR4maOF29b"
      },
      {
        "lainaaja": "Kauli Niinnistö",
        "lainauspv": "05/09/2023",
        "viimpalautuspv": "05/10/2023",
        "palautettupv":"Ei Palautettu",
        "Kirjanimi":"kalevala",
        "Kirjatunnitse":"a8ahR4mOF29b"
      }
]

function Adminsivu(){
    const [search, setSearch] = useState("");
    const [foundList, setFoundList] = useState([]);
    // Tietojen muokkaamisnappi
    const handleEditButton = () => {
        console.log("LOL")
    }

    /**
     * Etsii kirjoja nimen perusteella
     */
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        
        // Looppaa nimet läpi ja katsoo löytyykö vastaavia
        const filteredBooks = data
        .filter(book => book.Kirjanimi.toLowerCase()
        .includes(e.target.value.toLowerCase()))
        .map(book => book.Kirjanimi);
        // Looppaa kirjojen ja filterin läpi
        const filteredData = [];
        for(let i = 0; i < data.length; i++){
            for (let j = 0; j < filteredBooks.length; j++) {
                if(data[i].Kirjanimi === filteredBooks[j]){ // Etsii oikean datan
                    if(!filteredData.includes(data[i])){ // Katsoo ettei sitä ole vielä lisätty
                        filteredData.push(data[i]); // Lisää sen listaan
                    }
                }
            }
        }

    // Loopin jälkeen se data lisätään löydettyihin
    setFoundList(filteredData);
    }
    return(
        <div className='content'>
            <SearchBar func={handleSearchChange}/>
            <br />

            {
                // If-juttu joka laittaa laittaa search jutut näkyviin
                search == "" ? // Jos et ole etsinyt mitään palauta: 
                data.map(kirja =>
                    <ListItems 
                        kirja={kirja} 
                        keyName={kirja.Kirjatunnitse}
                        func={handleEditButton}
                    />
                )
                : // Jos olet etsinyt jotain palauta:   
                foundList.map(kirja => 
                    <ListItems 
                        kirja={kirja} 
                        keyName={kirja.Kirjatunnitse}
                        func={handleEditButton}
                    />   
                )
            }
            {/* <button onclick="topFunction()" id="myBtn" title="Go to top">Takaisin ylös</button> */}
        </div>
    )
}

export default Adminsivu;