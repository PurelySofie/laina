import React from "react"
import "./styles/App.css"
import Etusivu from "./pages/Etusivu"
import Lainasivu from "./pages/Lainasivu"
import Loginsivu from "./pages/Loginsivu"
import Adminsivu from "./pages/Adminsivu"
import Uusitili from "./pages/Uusitili"
import Salasana from "./pages/Salasana"
import Käyttäjäsivu from "./pages/Käyttäjäsivu"
import Navbar from "./modules/Navbar"
import Scanner from "./pages/Scanner"
import {BrowserRouter, Routes, Route} from "react-router-dom"

//Tämä sivu on vain routeille. Jos haluat routen extra sivulle tee sille route:
//Ensin tee seuraavanlainen: import Sivu from "./pages/Sivu"
//Sitten lisää <Route path="sivu" element={<Nimi jolla importtasit />} />
//Voit myös pyytää Sofialta apua tämän kanssa.

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Etusivu />} />
          <Route path="lainaa" element={<Lainasivu />} />
          <Route path="admin" element={<Adminsivu />} />
          <Route path="login" element={<Loginsivu />} />
          <Route path="register" element={<Uusitili />} />
          <Route path="forgotpassword" element={<Salasana />} />
          <Route path="userpage" element={<Käyttäjäsivu />} />
          <Route path="userpage/:sposti" element={<Käyttäjäsivu />} />
          <Route path="scanner"  element={<Scanner />}  />

        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
