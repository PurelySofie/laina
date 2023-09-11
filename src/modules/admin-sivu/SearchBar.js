import { useEffect, useState } from 'react'

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
                break; // Don't forget to add a break here
            default:
                break;
        }
    }, [props.etsittava]);

    return(
        <div>
            <input 
                onChange={props.func}
                placeholder={"Etsi kirjoja " + placeholderPaate}
            />

            <button onClick={handleClick}>Filters</button> {/*Nappi filtereille*/}
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