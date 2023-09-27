import axios from 'axios';

export const TeeLainaSivu = (props) => {
    const handleClick = () => {
        const data = {
          lainaaja: props.lainaaja,
          kirjaNimi: props.kirjaNimi,
        };
        axios.post("http://localhost:3000/api/json-teeLaina", data)
          .catch((error) => {
            console.error(error);
          });
    }
    return(
      <button onClick={handleClick}>Lainaa {props.kirjaNimi}</button>
    )
}