import React, { useState } from 'react';
import { TrEdit } from "./TrEdit";
/**
 * Sisältää koodin joka .map() 
 * function avulla tuo dataa
 * näkyviin halutussa muodossa
 */
const TableItems = (props) => {
    const [isEditing, setIsEditing] = useState(false);
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
    const handleClick = () => {
        setIsEditing(!isEditing)
        if(isEditing){
            if(window.confirm("Tallennetaanko muutokset?")){
                // TODO koodi tiedon tallentamiseen
            }
        }
    }
    return(
        <tr key={props.keyName} id={props.keyName} >
            {
                !isEditing ? // If-lause joka katsoo onko admin muokkaus-tilassa.
                <>
                    <td className="admin-li">{kirjanNimi}</td>
                    <td className="admin-li">{lainaaja}</td>
                    <td className="admin-li">{lainattu}</td>
                    <td className={`admin-li ${showclass}`} >{palautettavaViimeistaan}</td>
                    <td className="admin-li">{viimeinenPalautus}</td>
                    <td className="admin-li">{tunniste}</td>
                </>
                :
                <TrEdit
                    keyName={props.keyName}
                    showclass={showclass}
                    kirjanNimi={kirjanNimi}
                    lainaaja={lainaaja}
                    lainattu={lainattu}
                    palautettavaViimeistaan={palautettavaViimeistaan}
                    viimeinenPalautus={viimeinenPalautus}
                    tunniste={tunniste}
                    func={props.handleClick}
                />
            }
            <td className='admin-li'>
                <div onClick={handleClick} >
                    <button>{!isEditing ? "Muokkaa" : "Lopeta muokkaus"}</button>
                </div>
            </td>
        </tr>
    )
}

export default TableItems;