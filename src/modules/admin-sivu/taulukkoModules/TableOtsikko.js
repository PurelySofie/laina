import React, { useEffect, useState } from 'react'

/**
 * Sisältää adminnäkymän taulukon
 * otsikkokoodin
 */
export const TableOtsikko = (props) => {
    const [isRotated, setIsRotated] = useState(false); // Tila nuolen kääntämistä varten

    const toggleRotation = () => {
        setIsRotated(!isRotated); // Käännä nuolta vaihtamalla tilaa
    };
    return(
        <thead>
            <tr>
                <th className="admin-li">Kirjan nimi <div className={`arrow-button ${isRotated ? 'rotated' : ''}`} onClick={toggleRotation}></div></th>
                <th className="admin-li">Lainaaja<div className={`arrow-button ${isRotated ? 'rotated' : ''}`} onClick={toggleRotation}></div></th>
                <th className="admin-li">Lainattu<div className={`arrow-button ${isRotated ? 'rotated' : ''}`} onClick={toggleRotation}></div></th>
                <th className="admin-li" title="Palautettava viimeistään">Palaut. viim.<div className={`arrow-button ${isRotated ? 'rotated' : ''}`} onClick={toggleRotation}></div></th>
                <th className="admin-li" title="Viimeisin palautus">Viim. palaut.<div className={`arrow-button ${isRotated ? 'rotated' : ''}`} onClick={toggleRotation}></div></th>
                <th className="admin-li">Tunniste<div className={`arrow-button ${isRotated ? 'rotated' : ''}`} onClick={toggleRotation}></div></th>
            </tr>
        </thead>
    )
}