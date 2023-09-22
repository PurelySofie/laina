const fs = require('fs');
const updateId = require("./UpdateIdLainattavat")
/**
 * Sisältää koodin, joka
 * poistaa kirjan lainattavat.json
 * tiedostosta ja päivittää samalla kirjojen id:eet.
 * Funktiota kutsutaan osoitteesta:
 * http://localhost:3000/api/json-deleteBook
 */

async function deleteBook(idObj) {
    // Polku tiedostoon
    const pathToFile = "./src/databases/lainattavat/Lainattavat.json"
    const id = idObj.id;
    try {
        
        // Lukee datan polusta
        const jsonData = await JSON.parse(fs.readFileSync(pathToFile, "utf-8"));
        let jsonDataCopy = [...jsonData];
        
        try {
            // Poistaa kirjan
            jsonDataCopy.splice(id, 1)
    
            jsonDataCopy = updateId(jsonDataCopy);
    
            // Kirjoittaa uuden datan
            fs.writeFileSync(pathToFile, JSON.stringify(jsonDataCopy, null, 2));
        } catch (error) {
            console.error("Error deleting book:", error)
        }
    } catch (error) {
        console.error("Error reading data:", error)
    }
}

module.exports = deleteBook;
/*
[
  {
    "tyyppi": "Kirja",
    "nimi": "Sähkö ja ICT perusteet 2",
    "maara": 25,
    "saatavilla": 24,
    "id": 0
  },
  {
    "tyyppi": "Kirja",
    "nimi": "Fysiikka 101",
    "maara": 14,
    "saatavilla": 12,
    "id": 1
  }
]
*/