/**
 * Nodejs express palvelin joka kutsuu 
 * ja välittää tietoja react komponenteille
 */

const express = require('express');
const app = express();
const loadJsonLainat = require('./src/node/jsonHandleLainat'); // Polku jsonHandle tiedostoon
const loadJsonLainattavat = require('./src/node/jsonHandleLainattavat')
const port = 3001; // Portin voi vaihtaa jos tarvetta
const cors = require('cors'); // Sallii palveleiden välisen kommunikoinnin

app.use(cors({ origin: true, credentials: true }));
/**
 * /json-lainat tarkoittaa localportin loppua:
 * localport:3001/json-lainat
 **/ 
app.get('/api/json-lainat', async (req, res) => {
    try {
      const data = await loadJsonLainat();
      console.log('Data received from Lainat', data);   
      res.json(data);
    } catch (error) {
      console.error('Error handling JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

/**
 * Lukee lainattavat datan
 */
app.get('/api/json-lainattavat', async (req, res) => {
    try {
      const data = await loadJsonLainattavat();
      console.log('Data received from Lainattavat');
      res.json(data);
    } catch (error) {
      console.error('Error handling JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});