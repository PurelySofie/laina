const fs = require('fs');
/**
 * Sisältää koodin, jolla pystyy
 * lisätä uusia kirjoja lainattavat.json
 * tiedostoon. Funktiota kutsutaan
 * osoitteesta: http://localhost:3000/api/json-addBook
 * 
 */

async function addBook(data) {
  const filePath = "./src/databases/lainattavat/Lainattavat.json"; // Polku projektin juuresta
  const newData = data; // Uuden kirjan data

  try {
    // Lue data polusta
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Lisää uuden kirjan data entiseen dataan
    jsonData.push(newData);

    // Muuta takaisin stringiksi, ja laita autom. sisennys
    const jsonString = JSON.stringify(jsonData, null, 2);

    // kirjoittaa tiedostoon uuden datan
    fs.writeFileSync(filePath, jsonString, 'utf-8');
  } catch (error) {
    console.error('Error reading and appending data:', error);
  }
}

module.exports = addBook;