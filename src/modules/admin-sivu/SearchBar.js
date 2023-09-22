import { useEffect, useState } from 'react'
import { BiFilterAlt } from "react-icons/bi";

/**
 * Admin- ja/tai Käyttäjäsivun search palkki
 * 
 * Koodi löytyy, jolla tietoa etsitään
 * löytyy ./src/pages/Adminsivu.js
 * funktionimellä: handleSearchChange()
*/
const FilterPanel = (props) => {
      return (
        <div className='filter-panel'>
            <button 
                onClick={()=>{props.func("nimi")}}
                className={props.etsittava === "nimi" ? "active" : null}
            > 
                Etsi nimellä 
            </button>
            <button 
                onClick={() => { props.func("tunniste")}}
                className={props.etsittava === "tunniste" ? "active" : null}
            > 
                Etsi tunnuksella 
            </button>
            <button 
                onClick={() => { props.func("lainaaja")}}
                className={props.etsittava === "lainaaja" ? "active" : null}
            > 
                Etsi lainaajan nimellä 
            </button>
        </div>
      );      
}
                //  
const SearchBar = (props) => {
    const [showFilter, setShowFilter] = useState(false);
    // placeholderPaate vaihtuu filteriä vaihtaessa
    // eslint-disable-next-line
    const [placeholderPaate, setPlaceholderPaate] = useState("nimellä")

    const handleClick = () =>{
        setShowFilter(!showFilter)
    }

    /**
     * Switch case SearchBar:in
     * placeholderin päätteelle
     */
    useEffect(() => {
        switch (props.etsittava) {
            case "nimi":
                setPlaceholderPaate("nimellä");
                break;
            case "tunniste":
                setPlaceholderPaate("tunnisteella");
                break;
            default:
                break;
        }

        /**
         * TODO
         * Tyhjennä search palkki ja
         * saa se toimimaan järkevästi
         * 
         
         */
        // document.getElementById("search-bar-input-field").value;
    }, [props.etsittava]);

    return(
        <div className='search-and-filter'>
            <input 
                id='search-bar-input-field'
                onChange={props.func}
                placeholder={"Etsi kirjoja " + placeholderPaate}
            />

            <BiFilterAlt onClick={handleClick} className='filter-button' /> Nappi filtereille
            {
                // Jos filterinappia painaa returnaa filter valikko
                showFilter === true ?
                <FilterPanel 
                    func={props.func2} 
                    etsittava={props.etsittava} 
                />
                :
                <></> 
            }
            
        </div>
    )
}
export default SearchBar;