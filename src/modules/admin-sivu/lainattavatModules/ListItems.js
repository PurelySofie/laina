/**
 * Tekee <li> lainattavat kansion 
 * datasta
 */
const AllList = (props) => {
    return(
        <ul key={props.keyName}>
            <li>{props.book.tyyppi}</li>
            <li>{props.book.nimi}</li>
            <li>{props.book.maara}</li>
            <li>{props.book.saatavilla}</li>
            <br/>
        </ul>
    )
}

export const ListItems = (props) => {
    return(
        <div key={"lainattavatKey"}>
            {
                props.books.map(book =>
                    <AllList book={book} keyName={book.nimi}/>
                )
            }
        </div>
    )
}