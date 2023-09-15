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

export const TrEdit = (props) => {
    return(
        <>
            <td className="admin-li">{props.kirjanNimi}</td>
            {/**
             * Dropdown lista jossa voi vaihtaa lainaajan pois.
             * Samalla se poistaa kirjalainauksen.
             * */}
            <td className="admin-li">
                <select>
                    <option>{props.lainaaja}</option>
                    <option>Poista lainaus</option>
                </select>
            </td> 
            <td className="admin-li">{props.lainattu}</td>
            <td className="admin-li">
                <input type="date" defaultValue={props.palautettavaViimeistaan}/>
            </td>
            <td className="admin-li">{props.viimeinenPalautus}</td>
            <td className="admin-li">{props.tunniste}</td>
        </>
    )
}