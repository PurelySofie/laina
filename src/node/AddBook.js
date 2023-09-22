const fs = require('fs');
const randomstring = require("randomstring");
const sharp = require('sharp');
/**
 * Sisältää koodin, jolla pystyy
 * lisätä uusia kirjoja lainattavat.json
 * tiedostoon. Funktiota kutsutaan
 * osoitteesta: http://localhost:3000/api/json-addBook
 */

async function addBook(data) {
  console.log(data)
  console.log(imagePar)
  const folderPath = "./src/databases/lainattavat"
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


    // Tekee uuden kansion kirjan nimellä ja luo sille tunnukset:
    let books = [];
    for(let i = 0; i < newData.maara; i++){
      let obj = {
        tunniste:randomstring.generate(4),
        lainattu: false
      }
      books.push(obj);
    }
    const newPath = `${folderPath}/${newData.nimi}.json`
    books = JSON.stringify(books, null, 2)
    fs.writeFileSync(newPath, books, "utf-8")
  } catch (error) {
    console.error('Error reading and appending data:', error);
  }
}

module.exports = addBook;