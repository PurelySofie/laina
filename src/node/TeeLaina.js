const fs = require("fs");
const randomstring = require("randomstring");

/**
 * Tekee lainan, ottaa vastaan
 * lainaajan nimen ja kirjan nimen
 * 
 * Kutsutaan osoitteesta:
 * http://localhost:3000/api/json-teeLaina
 */

function formatDateToDDMMYYYY(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  function getDates() {
    // Get the current date
    const currentDate = new Date();
  
    // Aika kaksi viikkoa eteenpäins
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 14); // Lisää 14 päivää
  
    // Muuttaa muotoon dd/mm/yyyy
    const formattedCurrentDate = formatDateToDDMMYYYY(currentDate);
    const formattedFutureDate = formatDateToDDMMYYYY(futureDate);
  
    return { currentDate: formattedCurrentDate, futureDate: formattedFutureDate };
  }

async function teeLaina(lainaaja, kirjaNimi){
    console.log(lainaaja, kirjaNimi)
    const pathToLoanFile = `./src/databases/lainattavat/${kirjaNimi}.json`
    try {
        const data = await JSON.parse(fs.readFileSync(pathToLoanFile, "utf-8"));
        let dataCopy = [...data]

        // Vaihtaa kirjan tunnuksen lainatuksi
        let tunnus = "";
        for(let i = 0; i < dataCopy.length; i++){
            if(dataCopy[i].lainattu === false){
                dataCopy[i].lainattu = true;
                tunnus = dataCopy[i].tunniste
                break;
            }
        }
        // Tekee uuden tiedoston ja tallentaa sen datan
        try {
            // Tekee päiväyksen
            const { currentDate, returnDate } = getDates();
            const randomTunnus = randomstring.generate(5);

            const newPath = `./src/databases/lainat/${randomTunnus}.json`

            const data = {
                lainatunniste: randomTunnus,
                lainaaja: lainaaja,
                lainauspv: currentDate,
                viimpalautuspv: returnDate,
                palautettupv: "Ei Palautettu",
                nimi: kirjaNimi,
                tunniste: tunnus,
                palautettu: false
            }

            try {
                fs.writeFileSync(newPath, JSON.stringify(data, null, 2))
              } catch (error) {
                console.error('Error writing file:', error);
              }
        } catch (error) {
            console.error("Error creating file:", error)
        }
        console.log(tunnus, dataCopy)
    } catch (error) {
        console.error("Error reading file:", error)
    }
}

module.exports = teeLaina;