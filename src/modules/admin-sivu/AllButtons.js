/**
 * Sisältää adminsivulla käytettyjä nappeja
 */
export const CommonButton = (props) => {
    return(
        <button onClick={props.func} className={props.activeClass}>
            {props.text}
        </button>
    )
}

/**
 * Adminsivun napeille oleva tiedosto
 */

// Tietojen muokkaamis nappi
export const EditButton = (props) => {
    return(
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

// Kirjan lisäys nappi
// const AddButton = (props) => {

// }