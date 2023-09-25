import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Editointikohta
 */
const LiEdit = (props) => {
    const [prev, setPrev] = useState(0)

    useEffect(() => {
        setPrev(props.book.maara)
    }, [props.book.maara])

    const handleChange2 = (e) => {
        const maaraInput = document.getElementById("Maara");
        const saatavillaInput = document.getElementById("Saatavilla");
        
        if (maaraInput && saatavillaInput) {
          const maaraValue = parseInt(maaraInput.value);
          const saatavillaValue = parseInt(saatavillaInput.value);
            
          if (!isNaN(maaraValue)) {
            const diff = maaraValue - saatavillaValue;
            let added = 0;
            added = maaraValue - prev
            console.log(added)
            if(maaraValue > prev){
                // Suurempi
                // saatavillaInput.value = parseInt(saatavillaInput.value) + added;
            }else{
                // Pienempi
                added = maaraValue - prev
            }
            saatavillaInput.value = parseInt(saatavillaInput.value) + added;
            console.log(`${diff} = ${maaraValue} - ${saatavillaValue}`)


            
            setPrev(e.target.value)
          }
        }
    };
      
      
    return(
        <ul key={props.keyName}>
            <li>Tyyppi: 
                <select defaultValue={props.book.tyyppi} id="Tyyppi" onChange={props.handleChange}>
                    <option>Kirja</option>
                    <option>Joku muu</option>
                </select>
            </li>
            <li>Nimi: <input id="Nimi" type='text' defaultValue={props.book.nimi} onChange={props.handleChange}/></li>
            <li>Määrä: <input id="Maara" type='number' defaultValue={props.book.maara} onChange={(e) => {
                props.handleChange(e);
                handleChange2(e);
            }}/></li>
            <li>Saatavilla: <input id="Saatavilla" type='number' defaultValue={props.book.saatavilla} onChange={props.handleChange}/></li>
            <br/>
            <li>
                <button onClick={props.changeClick}>Lopeta muokkaus</button>
                <button onClick={props.handleClick}>Poista kirja</button>
            </li>
        </ul>   
    )
}

export default LiEdit;