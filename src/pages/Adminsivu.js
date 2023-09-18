/* TODO-List
Admin-sivu css - ei valmis

Data handling - Valmis

Lisää kirja kohta adminien pääsivulle? - ei valmis
Lista ja myöhästyneet pitää katsoa erikseen? - ei valmis

Admin sivulle myöhästyneet lainaukset näkymä. - ei valmis
 
Admineille QR Code scanneri joilla voi scannata kirjan koodin ja siirtää
    lainauksen statuksen lainatusta takaisin koululle. - qr-koodi ei valmis. Sen voi vaihtaa manuaalisesti mutta tieto ei tallennu mihinkään

Kirjoille lainaushistoria josta voi nähdä kenellä kirja
    on ollut siltä varalta että kirja on vahingoittuu. - ei valmis
*/
import React, { useEffect, useState } from 'react'
import "./Adminsivu.css"
import axios from 'axios';
/**
 * Sisältää adminnäkymän "pohja"
 * koodin
 */

// Module importit
// Jos näyttää punasta viivaa nii pitäis silti toimia
import { AdminBar } from '../modules/admin-sivu/AdminBar';
import AdminPageList from "../modules/admin-sivu/taulukkoModules/AdminPageList"


function Adminsivu(){
    const [search, setSearch] = useState("");
    const [foundList, setFoundList] = useState([]);
    const [jsonData, setJsonData] = useState(null);
    const [toSearch, setToSearch] = useState("nimi");

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
    const handleToSearch = (etsittava) => {
        setToSearch(etsittava)
    }
    /**
     * Etsii kirjoja nimen, tunnisteen
     * tai halutessa muiden asioiden
     * perusteella
     * 
     */
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        /**
         * Looppaa nimet läpi ja katsoo löytyykö vastaavia
        */
        const filteredData = [];
        if(toSearch === "nimi"){ // Etsii nimen perusteella
            /**
             * Luo listan kaikista
             * nimistä jotka matchaavat
             * etsittyä arvoa
             */
            const filteredBooks = 
            jsonData.filter(book => book.nimi.toLowerCase()
            .includes(e.target.value.toLowerCase()))
            .map(book => book.nimi);
            // Looppaa kirjojen ja filterin läpi
            for(let i = 0; i < jsonData.length; i++){
                for (let j = 0; j < filteredBooks.length; j++) {
                    if(jsonData[i].nimi === filteredBooks[j]){ // Etsii oikean datan
                        if(!filteredData.includes(jsonData[i])){ // Katsoo ettei sitä ole vielä lisätty
                            filteredData.push(jsonData[i]); // Lisää sen listaan
                        }
                    }
                }
            }
        } else if (toSearch === "tunniste"){ // Etsii tunnisteen perusteella
            const filteredBooks = 
            jsonData.filter(book => book.tunniste.toLowerCase()
            .includes(e.target.value.toLowerCase()))
            .map(book => book.tunniste);
            // Looppaa kirjojen ja filterin läpi
            for(let i = 0; i < jsonData.length; i++){
                for (let j = 0; j < filteredBooks.length; j++) {
                    if(jsonData[i].tunniste === filteredBooks[j]){ // Etsii oikean datan
                        if(!filteredData.includes(jsonData[i])){ // Katsoo ettei sitä ole vielä lisätty
                            filteredData.push(jsonData[i]); // Lisää sen listaan
                        }
                    }
                }
            }
        }
    // Loopin jälkeen data lisätään löydettyihin
    setFoundList(filteredData);
    }

    return(
        <div className='content'>
            <div className='inner-content'>
                {/* <div className='admin-bar'>
                    <AdminBar />
                </div> */}

                {/**
                 * Tuo näkyviin taulukon kaikista lainauksista 
                 * TODO
                 * Näytä vain ~15 lainausta per sivu,
                 * jonka jälkeen pitää painaa nappia ja
                 * kääntää uusi sivu. Takaa nopeamman 
                 * nopeuden sivulle
                 **/}
                <AdminPageList 
                    handleSearchChange={handleSearchChange}
                    handleToSearch={handleToSearch}
                    toSearch={toSearch}
                    search={search}
                    jsonData={jsonData}
                    foundList={foundList}
                />
            </div>
        </div>
    )
}

export default Adminsivu;