/*
Admin-sivu css

Data handling

Admin sivulle myöhästyneet lainaukset näkymä.
 
Admineille QR Code scanneri joilla voi scannata kirjan koodin ja siirtää lainauksen statuksen lainatusta takaisin koululle.
Koska pitää olla jonkinlainen systeemi jolla koulu voi siirtää lainauksia palautettuihin ja palauttaa kirjat uudelleen lainattaviksi.

Kirjoille lainaushistoria josta voi nähdä kenellä kirja on ollut siltä varalta että kirja on vahingoittuu.
*/
import React, { useEffect, useState } from 'react'
import "./Adminsivu.css"
import axios from 'axios';

// Module importit
// Jos näyttää punasta viivaa nii pitäis silti toimia
import ListItems from '../modules/admin-sivu/ListItems';
import SearchBar from '../modules/admin-sivu/SearchBar';

function Adminsivu(){
    const [search, setSearch] = useState("");
    const [foundList, setFoundList] = useState([]);
    const [jsonData, setJsonData] = useState(null);
    /**
     * Lataa admin-sivulle datan
     */

    useEffect(() => {
        axios.get('http://localhost:3001/json-handle') // Tekee pyynnön kyseiseen nettiosoitteeseen
        .then((response) => {
            setJsonData(response.data); // Lisää datan jsonData:aan
        })
        .catch((error) => {
            console.error('Error fetching JSON data:', error);
        });
    }, []);


    /**
     * Tulee näkyviin kun tietoja ladataan
     * Voi animoida hienosti joskus
     */
    if(jsonData == null || jsonData.length === 0){
        return(
            <div className='content'>Tietoja ladataan</div>
        )
    }
    const handleEditButton = () =>{}
    
    /**
     * Etsii kirjoja nimen perusteella
     */
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        
        /**
         * Looppaa nimet läpi ja katsoo löytyykö vastaavia
         */

        const filteredBooks = 
        jsonData.filter(book => book.nimi.toLowerCase()
        .includes(e.target.value.toLowerCase()))
        .map(book => book.nimi);
        // Looppaa kirjojen ja filterin läpi
        const filteredData = [];
        for(let i = 0; i < jsonData.length; i++){
            for (let j = 0; j < filteredBooks.length; j++) {
                if(jsonData[i].nimi === filteredBooks[j]){ // Etsii oikean datan
                    if(!filteredData.includes(jsonData[i])){ // Katsoo ettei sitä ole vielä lisätty
                        filteredData.push(jsonData[i]); // Lisää sen listaan
                    }
                }
            }
        }
    // Loopin jälkeen data lisätään löydettyihin
    setFoundList(filteredData);
    }


    return(
        <div className='content'>
            <SearchBar func={handleSearchChange}/>
            <br />


            {/* 
            ListItem.js jutusta
            scrollattava alue
            */}
            {
                // If-juttu joka laittaa laittaa search jutut näkyviin
                search === "" ? // Jos et ole etsinyt mitään palauta: 
                jsonData.map(kirja =>
                    <ListItems 
                        kirja={kirja} 
                        keyName={kirja.tunniste}
                        func={handleEditButton}
                    />
                )
                : // Jos olet etsinyt jotain palauta:   
                foundList.map(kirja => 
                    <ListItems 
                        kirja={kirja} 
                        keyName={kirja.tunniste}
                        func={handleEditButton}
                    />   
                )
            }
            {/* <button onclick="topFunction()" id="myBtn" title="Go to top">Takaisin ylös</button> */}
        </div>
    )
}

export default Adminsivu;