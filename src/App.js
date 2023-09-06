import React from "react"
import "./styles/App.css"
import Etusivu from "./pages/Etusivu"
import Lainasivu from "./pages/Lainasivu"
import Loginsivu from "./pages/Loginsivu"
import Adminsivu from "./pages/Adminsivu"
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
          <Route path="Loginsivu" element={<Loginsivu />} />
          <Route path="Adminsivu" element={<Adminsivu />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
