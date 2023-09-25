const fs = require("fs");
/**
 * Katsoo onko lainaus myöhässä.
 * Linux palvelimeen saa paketin joka
 * looppaa tietyn väliajoin
 * 
 * Voi myös loopata nodejs palvelimella jotenkin?
 * 
 * Tiedoston olisi tarkotus päivän vaihtuessa?
 */

function checkLateLainat() {
    const pathToFolder = "./src/databases/lainat" // Polku projektin juuresta
    try {
        // Lukee kansion sisällön
        const files = fs.readdirSync(pathToFolder)

        try {
            files.map( async (file) => {
                // Tekee polun
                const path = `${pathToFolder}/${file}`
                const data = await JSON.parse(fs.readFileSync(path, "utf-8"));

                // Muuttaa päiväyksen muotoon dd/mm/yyyy
                const dateComponents = data.viimpalautuspv.split("/"); // Paloittelee päiväyksen kauttaviivan kohdilta
                const day = dateComponents[0]; // Ottaa päivän
                const month = dateComponents[1]; // Ottaa kuukauden
                const year = dateComponents[2]; // Ottaa vuoden
                const formattedDateString = `${day}/${month}/${year}`; // Kasaa ne uuteen muotoon
                console.log(day, month, year , "=", formattedDateString)
                
                const targetDate = new Date(formattedDateString); // Tekee siitä uuden päiväyksen
        
                const currentDate = new Date(); // Nykyinen päiväys
                console.log(currentDate, targetDate, "=", currentDate < targetDate)
                if (currentDate < targetDate) {
                    // TODO Merkitse kirja myöhästyneeksi
                    console.log("Myöhässä")
                } else {
                    console.log("EI")
                }
            })
            
        } catch (error) {
            console.error("Error reading file:", error)
        }
    } catch (error) {
        console.log("Error reading directory:", error)
    }
}

checkLateLainat();
