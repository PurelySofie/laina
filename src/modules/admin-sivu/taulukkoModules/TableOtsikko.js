/**
 * Sisältää adminnäkymän taulukon
 * otsikkokoodin
 */
export const TableOtsikko = (props) => {
    return(
        <thead>
            <tr>
                <th>Kirjan nimi</th>
                <th>Lainaaja</th>
                <th>Lainattu</th>
                <th title="Palautettava viimeistään">Palaut. viim.</th>
                <th title="Viimeisin palautus">Viim. palaut.</th>
                <th>Tunniste</th>
            </tr>
        </thead>
    )
}