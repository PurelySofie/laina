import { useEffect, useState } from "react"
import axios from "axios"
import AdminPageList from "./listModules/AdminPageList"

/**
 * Sisältää lainaushistorian
 */
export const Lainaushistoria = (props) => {
    const [jsonData, setJsonData] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:3000/api/json-lainaushistoria")
        .then((response) => {
            setJsonData(response.data)
        })
        .catch((error) => {
            console.error('Error fetching JSON data:', error);
        });
    }, [])
    if(jsonData === null){
        return <div className="content">Tietoja ladataan</div>
    }
    return(
        <div>
                <AdminPageList 
                    handleSearchChange={props.handleSearchChange}
                    handleToSearch={props.handleToSearch}
                    toSearch={props.toSearch}
                    search={props.search}
                    jsonData={jsonData}
                    foundList={props.foundList}
                />
        </div>
    )
}
