import { debuggerStatement } from "@babel/types"

/**
 * Editointikohta
 */
const LiEdit = (props) => {
    return(
        <ul key={props.keyName}>
            <li>
                <select defaultValue={props.book.tyyppi} id="Tyyppi" onChange={props.handleChange}>
                    <option>Kirja</option>
                    <option>Joku muu</option>
                </select>
            </li>
            <li><input id="Nimi" type='text' defaultValue={props.book.nimi} onChange={props.handleChange}/></li>
            <li><input id="Maara" type='number' defaultValue={props.book.maara} onChange={props.handleChange}/></li>
            <li><input id="Saatavilla" type='number' defaultValue={props.book.saatavilla} onChange={props.handleChange}/></li>
            <br/>
            <li>
                <button onClick={props.handleClick}>Poista kirja</button>
                <button onClick={props.changeClick}>Lopeta muokkaus</button>
            </li>
        </ul>   
    )
}

export default LiEdit;