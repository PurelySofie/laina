/**
 * Sisältää koodin joka tuo näkyviin
 * editointi alueen osalle kirjan tiedoista.
 * Adminit voisi myös antaa lisä-
 * aikaa kirjanpalautukseen ja poistaa
 * lainauksen kokonaan
 * 
 * --------------------------------
 * 
 * Lainauksen poistaessa kyseinen lainaus
 * poistetaan TAI siirretään
 * /databases/lainat/ kansiosta.
 * Siitä tehdään kopio erilliseen
 * kansioon lainaushistoriaa varten
 * 
 * päivämäärää vaihtaessa se päivitetään
 * tiedostoon
 */

export const LiEdit = (props) => {
    return(
        <>
            <li className="admin-li">{props.kirjanNimi}</li>
            {/**
             * Dropdown lista jossa voi vaihtaa lainaajan pois.
             * Samalla se poistaa kirjalainauksen.
             * */}
            <li className="admin-li">
                <select>
                    <option>{props.lainaaja}</option>
                    <option>Poista lainaus</option>
                </select>
            </li> 
            <li className="admin-li">{props.lainattu}</li>
            <li className="admin-li">
                <input type="date" defaultValue={props.palautettavaViimeistaan}/>
            </li>
            <li className="admin-li">{props.viimeinenPalautus}</li>
            <li className="admin-li">{props.tunniste}</li>
        </>
    )
}