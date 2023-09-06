import React from "react"
import "./Adminsivu.css"
import ListItems from "../modules/ListItems"

// JSON-Import
// Väliaikanen
import kirjaData from "../Databases/Lainat.json"

function Adminsivu(){
    return(
        <div>
            <h1>Täällä muutetaan lainauksia</h1>
            <br />
            {
                kirjaData.map(kirja =>
                    <ListItems kirja={kirja} />
                )
            }
        </div>
    )
}

export default Adminsivu;