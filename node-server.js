/**
 * Nodejs express palvelin joka kutsuu 
 * ja välittää tietoja react komponenteille
 */

const express = require('express');
const app = express();
const port = 3001; // Portin voi vaihtaa jos tarvetta
const jsonDataHandler = require('./src/node/jsonHandle'); // Polku jsonHandle tiedostoon
const cors = require('cors'); // Sallii palveleiden välisen kommunikoinnin

app.use(cors({ origin: true, credentials: true }));
/**
 * /json-handle tarkoittaa localportin loppua:
 * localport:3001/json-handle
 **/ 
app.get('/json-handle', async (req, res) => {
    try {
      const data = await jsonDataHandler();
      console.log('Data received = ', data, "\n\n\n");
      res.json(data);
    } catch (error) {
      console.error('Error handling JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
