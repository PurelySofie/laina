import React from "react"
import "./Adminsivu.css"
import ListItems from "../modules/ListItems"

// JSON-Import
// Väliaikanen
import kirjaData from "../databases/lainat/Laina 1zh7a.json"

function Adminsivu(){
    return(
        <div class="content">
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