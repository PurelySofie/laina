/**
 * Sisältää adminien oman paneelin
 * josta he voivat valita tietyn sivun
 */
export const AdminBar = (props) => {
    return(
        <div className="Admin-Bar-Div">
            <ul className="Admin-Bar-Ul">
                <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Kirjat">Kirjat</li>
                <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Qr-skanneri">Qr-skanneri</li>
                <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Myohastuneet-Kirjat">Myöhästyneet kirjat</li>
                <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Lainaushistoria">Lainaushistoria</li>
            </ul>
        </div>
    )
}