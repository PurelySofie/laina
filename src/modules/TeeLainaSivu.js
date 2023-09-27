import axios from 'axios';

export const TeeLainaSivu = (props) => {
    const handleClick = () => {
      if(!window.confirm("Haluatko lainata kirjan:", props.kirjaNimi)){
        return;
      }
        const data = {
          lainaaja: props.lainaaja,
          kirjaNimi: props.kirjaNimi,
        };
        axios.post("http://localhost:3000/api/json-teeLaina", data)
          .catch((error) => {
            console.error(error);
          });

          props.updateData();
    }
    return(
      <button onClick={handleClick}>Lainaa {props.kirjaNimi}</button>
    )
}