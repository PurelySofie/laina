import TableItems from './TableItems';
import SearchBar from './SearchBar';
import { TableOtsikko } from './TableOtsikko';

export const AdminPageList = (props) => {
    return(
        <>
            <div>
                <SearchBar 
                    func={props.handleSearchChange} 
                    func2={props.handleToSearch} 
                    etsittava={props.toSearch}
                />
                    <br />
            </div>
            <table>
                <TableOtsikko />
                <tbody>
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
                                func={props.handleEditButton}
                            />
                        )
                        : // Jos olet etsinyt jotain palauta:   
                        props.foundList.map(kirja => 
                            <TableItems 
                                kirja={kirja} 
                                keyName={kirja.tunniste}
                                func={props.handleEditButton}
                            />   
                        )
                    }
                </tbody>
            </table>
        </>
    )
}