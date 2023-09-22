const fs = require('fs');
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
    const pathToFolder = "./src/databases/lainattavat"
    const id = idObj.id;
    try {
        
        // Lukee datan polusta
        const jsonData = await JSON.parse(fs.readFileSync(pathToFile, "utf-8"));
        let jsonDataCopy = [...jsonData];
        try {
          // Poistaa kirjan
          let nimi = jsonDataCopy[id].nimi;
          jsonDataCopy.splice(id, 1)
          
          // Päivittää id:eet        
          jsonData.map( async (book, i) => {
            book.id = i;
          })
          
          // Kirjoittaa uuden datan
          fs.writeFileSync(pathToFile, JSON.stringify(jsonDataCopy, null, 2));

          // Siirtää kirjan oman kansion:
          const newPath = `${pathToFolder}/${nimi}.json`
          const juuuu = `./src/databases/lainattavatHistoria/${nimi}.json`
          try {
            fs.renameSync(newPath, juuuu);
            console.log('File moved successfully.');
          } catch (error) {
            console.error('Error moving file:', error);
          }
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