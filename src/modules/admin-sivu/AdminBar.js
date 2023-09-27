import "./AdminBar.css";
import React from "react"; // Import React

export const AdminBar = (props) => {
  return (
    <div className="Admin-Bar-Div">
      <ul className="Admin-Bar-Ul">
        <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Kirjat">
          Kirjat
        </li>
        <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Qr-skanneri">
          Qr-skanneri
        </li>
        <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="AddBook">
          Lisää kirja
        </li>
        <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="KaikkiLainat">
          Kaikki lainat
        </li>
        <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Myohastuneet-Kirjat">
          Myöhästyneet kirjat
        </li>
        <li className="Admin-Bar-Il" onClick={props.handleClickAdmins} id="Lainaushistoria">
          Lainaushistoria
        </li>
      </ul>
    </div>
  );
};
