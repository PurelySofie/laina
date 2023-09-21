import axios from 'axios';
import { useEffect, useState } from 'react';
/**
 * Editointikohta
 */
const LiEdit = (props) => {
    return(
        <ul key={props.keyName}>
            <li>
                <select onChange={props.handleChange}>
                    <option>{props.book.tyyppi}</option>
                    <option>Joku muu</option>
                </select>
            </li>
            <li><input type='text' value={props.book.nimi} onChange={props.handleChange}/></li>
            <li><input type='number' value={props.book.maara} onChange={props.handleChange}/></li>
            <li><input type='number' value={props.book.saatavilla} onChange={props.handleChange}/></li>
            <br/>
            <li>
                <button onClick={props.handleClick}>Poista kirja</button>
                <button onClick={props.changeClick}>Lopeta muokkaus</button>
            </li>
        </ul>   
    )
}
/**
 * Tekee <li> lainattavat kansion 
 * datasta. Sisältää kirjan poistamis
 * kutsun
 */
const AllList = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [tyyppi, setTyyppi] = useState(null)
    const [nimi, setNimi] = useState(null)
    const [maara, setMaara] = useState(null)
    const [saatavilla, setSaatavilla] = useState(null)

    const handleChange = (e) => {
        console.log(e.target.type, "=", e.target.value)
    }
    const handleClick = () => {
        if(window.confirm("Haluatko poistaa kirjan?")){
            const data = {id: props.book.id}
            axios.post("http://localhost:3000/api/json-deleteBook", data)
            .catch((error) => {
                console.error("Error sending data:", error)
            })
            props.jsonFunc(); // Päivittää datan
        }
    }
    const changeClick = () => {
        if(isEditing){
            if(window.confirm("Tallennetaanko muutokset?")){
                console.log("TALLENTAA")
            }
        }
        setIsEditing(!isEditing)

    }
    return(
        <>
        {
            !isEditing ?
                <ul key={props.keyName}>
                    <li>{props.book.tyyppi}</li>
                    <li>{props.book.nimi}</li>
                    <li>{props.book.maara}</li>
                    <li>{props.book.saatavilla}</li>
                    <br/>
                    <li>
                        <button onClick={handleClick}>Poista kirja</button>
                        <button onClick={changeClick}>Muokkaa kirjan tietoja</button>
                    </li>
                </ul>
            :
            <LiEdit
                keyName={props.keyName}
                book={props.book}
                tyyppi={props.book.tyyppi}
                nimi={props.book.nimi}
                maara={props.book.maara}
                saatavilla={props.book.saatavilla}
                handleClick={handleClick}
                changeClick={changeClick}
                handleChange={handleChange}
            />
        }
        </>
    )
}

export const ListItems = (props) => {
    return(
        <div key={"lainattavatKey"}>
            {
                props.books.map(book =>
                    <AllList book={book} keyName={book.nimi} jsonFunc={props.jsonFunc}/>
                )
            }
        </div>
    )
}