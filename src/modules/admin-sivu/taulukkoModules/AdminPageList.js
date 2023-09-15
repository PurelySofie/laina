import TableItems from './TableItems';
import SearchBar from '../SearchBar';
import { TableOtsikko } from './TableOtsikko';

/**
 * Sisältää koodin joka renderöi
 * adminnäkymän taulukot:
 * /modules/admin-sivu/taulukkoModules/
 */

const AdminPageList = (props) => {
    return(
        <div className='admin-root-table'>
            <div> {/**Etsintäpalkki */}
                <SearchBar 
                    func={props.handleSearchChange} 
                    func2={props.handleToSearch} 
                    etsittava={props.toSearch}
                />
            <br />
            </div>

            <table>
                <TableOtsikko />
                <tbody className='admin-root-tbody'>
                    {/* 
                    TableItems.js jutusta
                    scrollattava alue
                    */}
                    {
                        // If-juttu joka laittaa laittaa search jutut näkyviin
                        props.search === "" ? // Jos et ole etsinyt mitään palauta: 
                        props.jsonData.map(kirja =>
                            <TableItems 
                                kirja={kirja} 
                                keyName={kirja.tunniste}
                                handleEditButton={props.handleEditButton}
                            />
                        )
                        : // Jos olet etsinyt jotain palauta:
                            props.foundList.length === 0 ? // Jos hakusi ei löytänyt mitään
                            <tr>
                                <td>Hakusi ei tuottanut tulosta</td>
                            </tr>
                            : // Jos hakusi löysi jotain
                            props.foundList.map(kirja => 
                                <TableItems 
                                    kirja={kirja} 
                                    keyName={kirja.tunniste}
                                    handleEditButton={props.handleEditButton}
                                />   
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default AdminPageList;