import React from 'react';
import './App.css';


function App() {
  return (
    <div className="banner">
      <div class="navbar">
        <ul>
          <li><a href="Etusivu.js">Koti</a></li>
          <li><a href="Lainasivu.js">Lainattavat</a></li>
          <li><a href="Loginsivu.js">Kirjaudu sisään</a></li>
          <li><a href="Adminsivu.js">Kirjaudu sisään admin</a></li>

        </ul>
      </div>

      <div class="content">
        <h1>Lainaa tarvittavasi helposti</h1>
        <p>Ohjeet</p>

        <button type="button" ><span></span>Kirjaudu sisään</button>
      </div>
      
    </div>
  );
}

export default App;

