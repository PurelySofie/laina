import ListItems from './ListItems';
import SearchBar from '../SearchBar';

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

            <ul className='admin-root-tbody'>
                {/* 
                ListItems.js jutusta
                scrollattava alue
                */}
                {
                    // If-juttu joka laittaa laittaa search jutut näkyviin
                    props.search === "" ? // Jos et ole etsinyt mitään palauta: 
                    props.jsonData.map(kirja =>
                        <ListItems 
                            kirja={kirja} 
                            keyName={kirja.tunniste}
                            handleEditButton={props.handleEditButton}
                        />
                    )
                    : // Jos olet etsinyt jotain palauta:
                        props.foundList.length === 0 ? // Jos hakusi ei löytänyt mitään
                        <li>
                            Hakusi ei tuottanut tulosta
                        </li>
                        : // Jos hakusi löysi jotain
                        props.foundList.map(kirja => 
                            <ListItems 
                                kirja={kirja} 
                                keyName={kirja.tunniste}
                                handleEditButton={props.handleEditButton}
                            />   
                        )
                }
            </ul>
        </div>
    )
}
export default AdminPageList;