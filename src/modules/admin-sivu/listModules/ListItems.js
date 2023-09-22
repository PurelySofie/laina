import React, { useState } from 'react';
import { LiEdit } from "./LiEdit";
import axios from "axios";
/**
 * Sisältää koodin joka .map() 
 * function avulla tuo dataa
 * näkyviin halutussa muodossa
 */
const ListItems = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const [toDelete, setToDelete] = useState(false)
    const [changeDate, setChangeDate] = useState(false)
    const [newDate, setNewDate] = useState(null)

    let kirjanNimi,
        lainaaja, lainattu,
        viimeinenPalautus, tunniste,
        palautettavaViimeistaan;

    const kirja = props.kirja;
    kirjanNimi = kirja.nimi
    lainaaja = kirja.lainaaja;
    lainattu = kirja.lainauspv
    palautettavaViimeistaan = kirja.viimpalautuspv
    viimeinenPalautus = kirja.palautettupv
    tunniste = kirja.tunniste

    /**
     * Katsoo onko palautus myöhässä.
     * Muuttaa päiväyksen muodosta:
     * mm/dd/yyyy muotoon:
     * dd/mm/yyyy
     */
    const dateComponents = palautettavaViimeistaan.split("/"); // Paloittelee päiväyksen kauttaviivan kohdilta
    const day = dateComponents[0]; // Ottaa päivän
    const month = dateComponents[1]; // Ottaa kuukauden
    const year = dateComponents[2]; // Ottaa vuoden
    const formattedDateString = `${day}/${month}/${year}`; // Kasaa ne uuteen muotoon
    const targetDate = new Date(formattedDateString); // Tekee siitä uuden päiväyksen
    const currentDate = new Date();
    let showclass = null;
    if (currentDate < targetDate) {
        showclass = "late";
    }

    /**
     * Tietojenmuokkausnapin
     * handlaus
     */
    const handleDelClick = (e) => {
        if(e.target.value === "Poista lainaus"){
            setToDelete(true);
        } else if(e.target.type === "date"){
            setChangeDate(true)
            setNewDate(e.target.value)
        }
    }
    const handleClick = () => {
        setIsEditing(!isEditing)
        if(isEditing){
            if(window.confirm("Tallennetaanko muutokset?")){
                // Tekee lähetettävän objectin kirjan tunnuksesta
                const tunnusObj = {
                    tunnus: kirja.tunniste,
                    date: null
                }                
                // Katsoo mitä pitää tehdä
                if(toDelete){
                    // Lähettää kyseiseen osoitteeseen datan
                    axios.post("http://localhost:3000/api/json-lainat-deleteBook", tunnusObj)
                    .catch((error) => {
                        console.error("Error sending data:", error)
                    })
                    setToDelete(false);
                } else if(changeDate){
                    // Lisää tunnusObj:iin uuden päivämäärän
                    tunnusObj.date = newDate;
                    
                    // Lähettää kyseiseen osoitteeseen datan
                    axios.post("http://localhost:3000/api/json-lainat-updateDate", tunnusObj)
                    .catch((error) => {
                        console.error("Error sending data:", error)
                    })
                    setChangeDate(false);
                }
                props.jsonFunc() // Päivittää datan sivulle
            }else{
                setChangeDate(false)
                setToDelete(false)
            }
        }
    }
    return(
        <div key={props.keyName} id={props.keyName} >
            {
                !isEditing ? // If-lause joka katsoo onko admin muokkaus-tilassa.
                <>
                    <img src='/images/Esim.jpeg'></img>
                    <li className="admin-li" title='Kirjan nimi'>{kirjanNimi}</li>
                    <li className="admin-li" title='Lainaaja'>{lainaaja}</li>
                    <li className="admin-li" title='Lainattu'>{lainattu}</li>
                    <li className={`admin-li ${showclass}`} title='Palautettava viimeistään'>{palautettavaViimeistaan}</li>
                    <li className="admin-li" title='Viimeisin palautus'>{viimeinenPalautus}</li>
                    <li className="admin-li" title='Tunniste'>{tunniste}</li>
                </>
                :
                <LiEdit
                    keyName={props.keyName}
                    showclass={showclass}
                    kirjanNimi={kirjanNimi}
                    lainaaja={lainaaja}
                    lainattu={lainattu}
                    palautettavaViimeistaan={palautettavaViimeistaan}
                    viimeinenPalautus={viimeinenPalautus}
                    tunniste={tunniste}
                    func={props.handleClick}
                    delFunc={handleDelClick}
                />
            }
            <div onClick={handleClick} >
                <button>{!isEditing ? "Muokkaa" : "Lopeta muokkaus"}</button>
            </div>
        </div>
    )
}

export default ListItems;