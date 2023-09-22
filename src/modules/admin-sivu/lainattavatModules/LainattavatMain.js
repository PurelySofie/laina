import { ListItems } from "./ListItems"

export const LainattavatMain = (props) => {
    return(
        <div>
            {
                /**
                 * Tuo näkyviin vain Lainattavat.json tiedoston
                 */
                props.jsonData.map(books =>
                    books[0] === "Lainattavat.json" ?
                        <ListItems books={books[1]} jsonFunc={props.jsonFunc}/>
                    :
                        <></>
                )
            }
        </div>
    )
}   