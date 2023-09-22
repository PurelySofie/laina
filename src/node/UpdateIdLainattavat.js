const fs = require("fs")
/**
 * Päivittää vain Id:eet lainattavat.json tiedostossa
 * 
 * Kutsutaan importtaamalla funktio:
 * const updateId = require("relatiivinen/polku/tähän/tiedostoon")
 * updateId(lainattavat.json data)
 */

async function updateId(jsonData){
    // Päivittää id:eet
    jsonData.map((book, i) => {
        book.id = i;
    })
    return results
}

module.exports = updateId