/* TODO-List
Admin-sivu css - ei valmis
Data handling - Valmis

Lisää kirja kohta adminien pääsivulle? - Valmis
myöhästyneet pitää katsoa erikseen? - ei valmis
 
Admineille QR Code scanneri joilla voi scannata kirjan koodin ja siirtää
    lainauksen statuksen lainatusta takaisin koululle. - qr-koodi ei valmis. Sen voi vaihtaa manuaalisesti

Kirjoille lainaushistoria josta voi nähdä kenellä kirja
    on ollut siltä varalta että kirja on vahingoittuu. - Valmis
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
import AdminPageList from '../modules/admin-sivu/listModules/AdminPageList';
import { LainattavatMain } from '../modules/admin-sivu/lainattavatModules/LainattavatMain';
import { MyohastuneetSivu } from '../modules/admin-sivu/MyohastyneetSivu';
import { AdminQrScanner } from '../modules/admin-sivu/Admin-Qr-Scanner';
import { Lainaushistoria } from '../modules/admin-sivu/Lainaushistoria';
import { AddBook } from '../modules/admin-sivu/AddBook';

var string = require("randomstring");

function Adminsivu(){
    const [search, setSearch] = useState("");
    const [foundList, setFoundList] = useState([]);
    const [toSearch, setToSearch] = useState("nimi");
    const [lainatData, setLainatData] = useState(null);
    const [lainattavatData, setLainattavatData] = useState([])

    // Jos paremman tavan keksii käyttäkää ihmeessä!
    const [activePage, setActivePage] = useState("LainattavatMain")

    const loadData = () => {
        /**
         * Lataa admin-sivulle datan
         * lainat
         */
        axios.get('http://localhost:3000/api/json-lainat') // Tekee pyynnön kyseiseen nettiosoitteeseen
        .then((response) => {
            setLainatData(response.data); // Lisää datan lainatData:aan
        })
        .catch((error) => {
            console.error('Error fetching JSON data:', error);
        });
        /**
         * Lataa lainattavat
        */
        axios.get('http://localhost:3000/api/json-lainattavat') // Tekee pyynnön kyseiseen nettiosoitteeseen
        .then((response) => {
            setLainattavatData(response.data); // Lisää datan LainattavatData:aan
        })
        .catch((error) => {
            console.error('Error fetching JSON data:', error);
        });    
    }
    useEffect(() => {
        loadData()
    }, [])
    
    /**
     * Tulee näkyviin kun tietoja ladataan
     * Voi animoida hienosti joskus
        */
    if(lainatData == null || lainatData.length === 0 || lainattavatData.length === 0 || lainattavatData == null ){
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
     */
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        /**
         * Looppaa nimet läpi ja katsoo löytyykö vastaavia
        */
        const filteredData = [];
        if(toSearch === "nimi"){ // Etsii kirjan nimen perusteella
            /**
             * Luo listan kaikista
             * nimistä jotka matchaavat
             * etsittyä arvoa
             */
            const filteredBooks = 
            lainatData.filter(book => book.nimi.toLowerCase()
            .includes(e.target.value.toLowerCase()))
            .map(book => book.nimi);
            // Looppaa kirjojen ja filterin läpi
            for(let i = 0; i < lainatData.length; i++){
                for (let j = 0; j < filteredBooks.length; j++) {
                    if(lainatData[i].nimi === filteredBooks[j]){ // Etsii oikean datan
                        if(!filteredData.includes(lainatData[i])){ // Katsoo ettei sitä ole vielä lisätty
                            filteredData.push(lainatData[i]); // Lisää sen listaan
                        }
                    }
                }
            }
        } else if (toSearch === "tunniste"){ // Etsii tunnisteen perusteella
            const filteredBooks = 
            lainatData.filter(book => book.tunniste.toLowerCase()
            .includes(e.target.value.toLowerCase()))
            .map(book => book.tunniste);
            // Looppaa kirjojen ja filterin läpi
            for(let i = 0; i < lainatData.length; i++){
                for (let j = 0; j < filteredBooks.length; j++) {
                    if(lainatData[i].tunniste === filteredBooks[j]){ // Etsii oikean datan
                        if(!filteredData.includes(lainatData[i])){ // Katsoo ettei sitä ole vielä lisätty
                            filteredData.push(lainatData[i]); // Lisää sen listaan
                        }
                    }
                }
            }
        } else if (toSearch === "lainaaja"){ // Etsii lainaajan perusteella
            const filteredBooks = 
            lainatData.filter(book => book.lainaaja.toLowerCase()
            .includes(e.target.value.toLowerCase()))
            .map(book => book.lainaaja);
            // Looppaa kirjojen ja filterin läpi
            for(let i = 0; i < lainatData.length; i++){
                for (let j = 0; j < filteredBooks.length; j++) {
                    if(lainatData[i].lainaaja === filteredBooks[j]){ // Etsii oikean datan
                        if(!filteredData.includes(lainatData[i])){ // Katsoo ettei sitä ole vielä lisätty
                            filteredData.push(lainatData[i]); // Lisää sen listaan
                        }
                    }
                }
            }
        }
    // Loopin jälkeen data lisätään löydettyihin
    setFoundList(filteredData);
    }


    /**
     * Sivut admin sivulle
     * I
     * I
     * V
     */
    const pages = {
        LainattavatMain: <LainattavatMain jsonData={lainattavatData} jsonFunc={loadData} />,
        AdminQrScanner: <AdminQrScanner />,
        MyohastuneetSivu: <MyohastuneetSivu />,
        Lainaushistoria: <Lainaushistoria 
            handleSearchChange={handleSearchChange}
            handleToSearch={handleToSearch}
            toSearch={toSearch}
            search={search}
            foundList={foundList}
        />,
        KaikkiLainat: <AdminPageList 
            handleSearchChange={handleSearchChange}
            handleToSearch={handleToSearch}
            toSearch={toSearch}
            search={search}
            jsonData={lainatData}
            foundList={foundList}
        />
      };
      // Valitsee oikean sivun:
      const pageToRender = pages[activePage] || null;
      
      

    /**
     * Adminbar funktio
     */
    const handleClickAdminBar = (e) => {
        switch (e.target.id) {
            case "Myohastuneet-Kirjat":
                setActivePage("MyohastuneetSivu")
                break;
            case "Qr-skanneri":
                setActivePage("AdminQrScanner")
                break;
            case "Lainaushistoria":
                setActivePage("Lainaushistoria")
                break;
            case "Kirjat":
                setActivePage("LainattavatMain")
                break;
            case "KaikkiLainat":
                setActivePage("KaikkiLainat")
                break;
        }
        /*
        Myohastuneet-Kirjat
        Qr-skanneri
        Lainaushistoria
        */
    }
    return(
        <div className='content'>
            <div className='inner-content'>
                <div className='admin-bar'>
                    <AdminBar handleClickAdmins={handleClickAdminBar}/>
                </div>

                <div className="add-book">
                    <AddBook jsonData={lainattavatData} jsonFunc={loadData}/>
                </div>

                {/**
                 * Tuo näkyviin lainattavat kansion datan
                */}
                <div className='toinenpalkki'>
                    <>{pageToRender}</>
                </div>
            </div>
        </div>
    )
}

export default Adminsivu;