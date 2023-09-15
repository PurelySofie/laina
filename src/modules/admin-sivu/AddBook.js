import { useState } from "react"

/**
 * Sisältää koodin joka
 * sallii uuden kirjan
 * lisäämisen.
 */
export const AddBook = (props) => {
    const [addState, setAddState] = useState("")
    const handleClick = () => {
        console.log("oujee")
    }
    return(
        <>
            <input placeholder="Kirjan nimi"/>
            <input placeholder="Määrä"/>
            <input /> // Tunnisteen koodi tekee automaattisesti?

            <button onClick={handleClick}>
                Lisää kirja
            </button>
        </>
    )
}
