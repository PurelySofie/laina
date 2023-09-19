import { useState } from "react"

/**
 * Sisältää koodin joka
 * sallii uuden kirjan
 * lisäämisen.
 */
export const AddBook = (props) => {
    const [showPanel, setShowPanel] = useState(false)    
    const handleClick = () => {
        
    }
    return(
        <>
            <button onClick={() => {setShowPanel(!showPanel)}}></button>
            <input placeholder="Kirjan nimi"/>
            <input placeholder="Määrä"/>
            <input /> // Tunnisteen koodi tekee automaattisesti?

            <button onClick={handleClick}>
                Lisää kirja
            </button>
        </>
    )
}
