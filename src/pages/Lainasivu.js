//import React from "react"
///import "./Lainasivu.css"

//function Lainasivu(){
   // return(
        //<div>
           // <h1>Täällä lainataan</h1>
        //</div>
   // );
//}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Etusivu.css"

function KirjojenLainausSivu() {
  const { kirjaId } = useParams();
  const [kirja, setKirja] = useState(null);

  useEffect(() => {
    // Tässä voit tehdä HTTP-pyynnön hakeaksesi kirjan tiedot kirjaId:n perusteella
    fetch(`/api/kirjat/${kirjaId}`)
      .then((response) => response.json())
      .then((data) => setKirja(data))
      .catch((error) => console.error("Virhe kirjatietojen haussa: ", error));
  }, [kirjaId]);


  //skanneri linkki
function App() {
  const openQRCodeScannerWindow = () => {
    const newWindow = window.open('', 'QR Code Scanner', 'width=400,height=400');
    newWindow.document.title = 'QR Koodi Skanneri';

    ReactDOM.render(<QRCodeScanner />, newWindow.document.body);
  };

  return (
    <div>
      <button onClick={openQRCodeScannerWindow}>Open QR Code Scanner</button>
    </div>
  );
}


  if (!kirja) {
    return <div>Ladataan kirjatietoja...</div>;
  }

  return (
    <div>
      <h1>Kirjan tiedot</h1>
      <h2>{kirja.nimi}</h2>
      <p>Kirjailija: {kirja.kirjailija}</p>
      <p>Julkaisuvuosi: {kirja.julkaisuvuosi}</p>
      <p>Saatavuus: {kirja.saatavuus ? "Saatavilla" : "Ei saatavilla"}</p>
      <button>Lainaa kirja</button>
    </div>
  );

}

export default KirjojenLainausSivu;

    