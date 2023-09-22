const fs = require("fs");
const sharp = require("sharp")
/**
 * Lisää kirjan public/images kansioon
 * 
 * Kutsutaan osoitteesta:
 * http://localhost:3000/api/json-addBook-coverImage
 */

async function addBookCover(filename, data){
    const path = `./public/images/${filename}` // Polku juuriluotuun tiedostoon
    try {
        // Lue kuva
        const image = fs.readFileSync(path)
        // Tee kuvalle uusi nimi
        const newName = data.name

        // Tee polku, mihin kuva tullaan tallentamaan ja millä nimellä
        const outputPath = `./public/images/${newName}.jpeg`;

        // Muuttaa kuvan jpeg muotoon
        await sharp(image) 
        .jpeg({ quality: 100 }) // Kuvan laatu
        .toFile(outputPath);    // Mihin se tulee

        // Poista alkuperäinen kuva
        fs.unlinkSync(path)
    } catch (error) {
        console.error('Error Reading, converting and saving image:', error);
    }
}
module.exports = addBookCover