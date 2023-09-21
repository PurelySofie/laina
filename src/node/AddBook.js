const fs = require('fs');

async function addBook(data) {
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
    console.log('Data appended and saved successfully!');
  } catch (error) {
    console.error('Error reading and appending data:', error);
  }
}

module.exports = addBook;