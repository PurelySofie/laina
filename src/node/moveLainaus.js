const { moduleExpression } = require("@babel/types");
const fs = require("fs")

/**
 * Siirtää tiedoston /databases/lainausHistoria/
 * kansioon
 * 
 * Funktiota kutsutaan osoitteesta:
 * http://localhost:3000/json-lainat-deleteBook
 * En jaksa vaihtaa uuteen url-nimeen niin pysykööt 
 * tollasena
 */

async function moveLainaus(tunnusObj){
    const pathToFolder = "./src/databases/lainat" // Polku kansioon
    const history = "./src/databases/lainausHistoria"
    const tunnus = tunnusObj.tunnus; // Kirjan tunnus
    console.log(tunnusObj)
    try {
        // Lukee kansion
        const files = fs.readdirSync(pathToFolder);
        
        /**
         * Looppaa tiedostojen läpi, etsien oikean id:een
         * Huom! Saa optimisoida paremmaksi!
        */
       files.map(async (file) => {
           // Tekee polun
           const path = `${pathToFolder}/${file}`

           try {
                // Lukee tiedoston ja muuttaa sen sisällön json muotoon
                const data = fs.readFileSync(path, "utf-8");
                const jsonData = JSON.parse(data);

                // Etsii oikean tunnisteen
                if(jsonData.tunniste === tunnus){
                    try {
                        const historyPath = `${history}/${file}`
                        fs.renameSync(path, historyPath)
                        return path;
                    } catch (error) {
                        console.error("Error deleting or moving file:", error)
                    }
                }
            } catch (error) {
                console.error("Error reading file:", error)
            }
            })
    } catch (error) {
        console.error("Error reading directory:", error)
    }
}

module.exports = moveLainaus;