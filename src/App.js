import React from "react"
import "./styles/App.css"
import Etusivu from "./pages/Etusivu"
import Lainasivu from "./pages/Lainasivu"
import Loginsivu from "./pages/Loginsivu"
import Adminsivu from "./pages/Adminsivu"
import Uusitili from "./pages/Uusitili"
import Salasana from "./pages/Salasana"
import Navbar from "./modules/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return ( 
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Etusivu />} />
          <Route path="Lainasivu" element={<Lainasivu />} />
          <Route path="Adminsivu" element={<Adminsivu />} />
          <Route path="Loginsivu" element={<Loginsivu />} />
          <Route path="Uusitili" element={<Uusitili />} />
          <Route path="Salasana" element={<Salasana />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
