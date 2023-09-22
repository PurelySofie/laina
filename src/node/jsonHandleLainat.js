const fs = require('fs');
/**
 * Lukee kansion, tässä tapauksessa
 * /databases/lainat/ ja palauttaa siellä olevan
 * datan listana, jona sitä käytetään reactin puolella
 * funktiota kutsutaan http://localhost:3000/api/json-lainat
 * osoitteesta
 * 
*/
async function loadJsonLainat() {
  const folder = './src/databases/lainat'; // Polku projektin juuresta
  const results = []; // Tulee sisältämään datan jonka tiedosto lukee
  try {
    const files = fs.readdirSync(folder); // Lukee kansion sisällön

    /**
     * Tekee uuden promisen, jotta kutsuja odottaa
     * ennenkuin yrittää tehdä datalla mitään
     */
    const jsonPromise = files.map(async (file) => {
      const path = `${folder}/${file}`; // Tekee polun

      /**
         * Muuttaa datan JSON-muotoon
         * ja työntää arrayhin "results"
         */
      try {
        const data = fs.readFileSync(path, 'utf-8'); 
        const jsonData = JSON.parse(data);
        results.push(jsonData);
      } catch (error) { // Error check
        console.error('Error reading or parsing JSON data:', error);
      }
    });

    /**
     * Odottaa että jsonPromise
     * on tehnyt mappauksen, jotta sitä
     * ei palauteta keskeneräisenä
     */
    await Promise.all(jsonPromise);
    return results;
  } catch (error) { // Error check
    console.error('Error reading directory:', error);
    throw error;
  }
}

module.exports = loadJsonLainat;
