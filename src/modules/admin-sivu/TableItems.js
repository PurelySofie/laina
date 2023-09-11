import { EditButton } from "./AllButtons";
import React, { useState } from 'react';
/**
 * Sisältää koodin joka .map()
 * function avulla dataa näkyviin
 * halutussa muodossa
 */
const TableItems = (props) => {
    const [isRotated, setIsRotated] = useState(false); 
    const toggleRotation = () => {
        setIsRotated(!isRotated);
    };
    
    let teksti, kirjanNimi,
        lainaaja, lainattu,
        viimeinenPalautus, tunniste,
        palautettavaViimeistaan, palautettu;

    const kirja = props.kirja;
    // Antaa kirjalle nimen

    kirjanNimi = kirja.nimi

    /**
     * If-lause joka katsoo
     * onko kirjalla lainaajaa 
     * ja antaa kirjan tiedoille
     * arvoja sen perusteella
     */
    if(props.lainaaja !== "nA"){ // nA:n tilalle jokin jolla merkitään että kirja ei ole lainassa
        lainaaja = kirja.lainaaja;
        lainattu = kirja.lainauspv
        palautettavaViimeistaan = kirja.viimpalautuspv
        viimeinenPalautus = kirja.palautettupv
    }else{
        lainaaja = "Ei lainassa"
        /*
        lainattu = kirja.lainauspv
        palautettavaViimeistaan = kirja.viimpalautuspv
        viimeinenPalautus = kirja.palautettupv
        */
    }
    // Antaa tunnisteen
    tunniste = kirja.tunniste
    
    /*
    teksti = 
    "Kirjan nimi: " + kirjanNimi
    + ". Lainaaja: " + lainaaja
    + ". Lainattu: " + lainattu
    + ". Palautetattava viimeistään: " + palautettavaViimeistaan
    + ". Viimeisin palautus: " + viimeinenPalautus
    + ". Tunniste: " + tunniste;
*/


    return(
        <tr key={props.keyName}>
            <td className="admin-li">{kirjanNimi}</td>
            <td className="admin-li">{lainaaja}</td>
            <td className="admin-li">{lainattu}</td>
            <td className="admin-li">{palautettavaViimeistaan}</td>
            <td className="admin-li">{viimeinenPalautus}</td>
            <td className="admin-li">{tunniste}</td>
            <td> 
                <EditButton text="Muokkaa"/>
            </td>
        </tr>
    )
}

export default TableItems;