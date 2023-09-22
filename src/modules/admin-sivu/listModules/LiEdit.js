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
            <img src='/images/Esim.jpeg'></img>
            <li className="admin-li">{props.kirjanNimi}</li>
            {/**
             * Dropdown lista jossa voi vaihtaa lainaajan pois.
             * Samalla se poistaa kirjalainauksen.
             * */}
            <li className="admin-li">
                <select onChange={props.delFunc}> 
                    <option>{props.lainaaja}</option>
                    <option >Poista lainaus</option> {/*Jos vaihat tekstiä, vaiha se myös ListItems.js handleDelClick funktiossa */}
                </select>
            </li> 
            <li className="admin-li">{props.lainattu}</li>
            <li className="admin-li">
                <input onChange={props.delFunc} type="date" defaultValue={props.palautettavaViimeistaan}/>
            </li>
            <li className="admin-li">{props.viimeinenPalautus}</li>
            <li className="admin-li">{props.tunniste}</li>
        </>
    )
}