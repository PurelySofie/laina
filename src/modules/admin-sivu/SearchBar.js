import { useState } from 'react'
import { CommonButton } from './AllButtons'

/**
 * Admin- ja/tai Käyttäjäsivun search palkki
 * 
 * Koodi löytyy, jolla tietoa etsitään
 * löytyy ./src/pages/Adminsivu.js
 * funktionimellä: handleSearchChange()
*/
const FilterPanel = (props) => {

    // TODO Kun nappia painaa, aktivoidussa filterissä on erilainen väri
    return(
        <div>
            <CommonButton text="Etsi nimellä" activeClass={"active"}/>
            <CommonButton text="Etsi tunnuksella"/>
        </div>
    )
}

const SearchBar = (props) => {
    const [showFilter, setShowFilter] = useState(false);
    // placeholderPaate vaihtuu filteriä vaihtaessa
    const [placeholderPaate, setPlaceholderPaate] = useState("nimellä")

    const handleClick = () =>{
        if(!showFilter){
            setShowFilter(true)
        }else{
            setShowFilter(false)
        }
    }
    return(
        <div>
            <input 
                onChange={props.func}
                placeholder={"Etsi kirjoja " + placeholderPaate}
            />
            <button onClick={handleClick}>Filters</button> {/*Nappi filtereille*/}
            {
                // Jos filterinappia painaa returnaa filter valikko
                showFilter == true ?
                <FilterPanel />
                :
                <></> 
            }
            
        </div>
    )
}
export default SearchBar;