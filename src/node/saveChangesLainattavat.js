const fs = require("fs");

/**
 * Tallentaa muunnetun datan lainattavat.json
 * tiedostoon.
 * Olio jonka funktio ottaa vastaan:
 * {
 * tyyppi: null,
 *  nimi: null,
 *  maara: 100,
 *  saatavilla: 90,
 * id, (kirjan id)
 * }
 * Jos jotain dataa ei muokattu, se tulee null:ina
 * 
 * Funktiota kutsutaan osoitteesta:
 * http://localhost:3000/api/json-saveChanges-lainattavat
 */
async function saveChangesLainattavat(rawData){
    const pathToFile = "./src/databases/lainattavat/Lainattavat.json" // Polku projektin juuresta
    const pathToFolder = "./src/databases/lainattavat"
    const pathToFolderImg = "./public/images"
    try {
        // Lukee tiedoston
        const jsonData = await JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

        // Kopioi sen
        let jsonDataCopy = [...jsonData]
        try {
            // Kirjoittaa muutokset
            // Laittaa muutokset id:een kohalle:
            if(rawData.tyyppi != null){
                jsonDataCopy[rawData.id].tyyppi = rawData.tyyppi
            }
            if(rawData.nimi != null){
                jsonDataCopy[rawData.id].nimi = rawData.nimi

                // Nimeää .json tiedoston uudelleen
                fs.renameSync(`${pathToFolder}/${jsonDataCopy[rawData.id].nimi}.json`,`${pathToFolder}/${rawData.nimi}.json`)

                // Nimeää .jpeg kansikuvan uudelleen
                fs.renameSync(`${pathToFolderImg}/${jsonDataCopy[rawData.id].nimi}.jpeg`,`${pathToFolderImg}/${rawData.nimi}.jpeg`)
            }
            if(rawData.maara != null){
                // Polku uuteen kansioon
                const pathToFolder2 = `./src/databases/lainattavat/${jsonDataCopy[rawData.id].nimi}.json`

                // Vähentää tai nostaa lainattavien määrää                
                if(jsonDataCopy[rawData.id].maara > rawData.maara){
                    // Pienempi
                    // Poistaa määrää
                    const toBeDeleted = jsonDataCopy[rawData.id].maara - rawData.maara
                    let deleted = 0;
                    try {
                        const contents = JSON.parse(fs.readFileSync(pathToFolder2, "utf-8"))

                        // Kopioi
                        let contentsCopy = [...contents]

                        // Looppaa contentin läpi
                        for(let i = 0; i < contents.length; i++){
                            
                            // Jos kirja ei ole lainattu
                            if(contentsCopy[i].lainattu !== true){
                                console.log("KONENT:", contentsCopy[i])
                                // Poista se
                                contentsCopy.splice(i, 1)

                                // Lisää poistettuihin yhden
                                deleted++

                                // Miinustaa i:stä yhen, poistamisen takia
                                i--
                            }
                            // Jos poistettu oikea määrä, poistu loopista
                            if(deleted === toBeDeleted){
                                break;
                            }

                        }
                        // Tallentaa tiedoston
                        try {
                            
                        } catch (error) {
                            console.log("Error appending and saving file:", error)
                        }
                    } catch (error) {
                        console.error("Error reading file:", error)
                    }
                } else{
                    // Suurempi
                    // Lisää määrän
                }
                
                jsonDataCopy[rawData.id].maara = rawData.maara
            }
            if(rawData.saatavilla != null){
                // Vähentää tai nostaa saatavilla olevien kirjojen määrää
                jsonDataCopy[rawData.id].saatavilla = rawData.saatavilla

            }

            // fs.writeFileSync(pathToFile, JSON.stringify(jsonDataCopy, null, 2));
        } catch (error) {
            console.error("Error appending or saving file:", error)
        }
    } catch (error) {
        console.error("Error reading file:", error)
    }
}
module.exports = saveChangesLainattavat;