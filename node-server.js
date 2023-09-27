/**
 * Nodejs express palvelin joka kutsuu 
 * ja välittää tietoja react komponenteille
 * 
 * Palvelin pitää käynnistää uudelleen jos muutoksia tekee
 * 
 * Esimerkkikoodilla meinataan sitä että miten kutsut funktiota,
 * ja mitä lähetät sille.
 * 
 * TODO:
 * - Kaikki:
 *    - Estä duplicate nimet.
 *    - ID:eiden tekoon joku järkevämpi tapa, ettei tuu samoja monesti putkeen
*/

const express = require('express');
const app = express();
const path = require("path")
const multer = require('multer'); // Käytetään tiedostojen käsittelyyn, kuten kuvien


// Funktio importit
const loadJsonLainat = require('./src/node/jsonHandleLainat');
const loadJsonLainattavat = require('./src/node/jsonHandleLainattavat')
const addJsonBook = require('./src/node/AddBook')
const deleteJsonBook = require("./src/node/DeleteBook")
const moveLainaus = require("./src/node/moveLainaus")
const updateDateLainaus = require("./src/node/jsonUpdateDate")
const saveChangesLainattavat = require("./src/node/saveChangesLainattavat")
const jsonHandleLainausHistoria = require("./src/node/jsonHandleLainausHistoria")
const addJsonBookCover = require("./src/node/AddBookCover")
const teeLaina = require("./src/node/TeeLaina")

const port = 3001; // Portin voi vaihtaa jos tarvetta
const cors = require('cors'); // Sallii palveleiden välisen kommunikoinnin
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Sallii jotain json-juttujen tekoa
app.use(cors({ origin: true, credentials: true }));


/**
 * Kuvia voi lisätä suoraan tekemällä pyynnön /images/kuvannimi.tiedostopääte
 * Kun kuvat lisää kansioon: /public/images/, 
 * voit tehdä seuraavanlaisen pyynnön img tagissa:
 * <img src="/images/kuvanNimi.pääte"></src>
 * Kuva tulee näkyviin html:ään
 * Esimerkki löytyy /src/modules/admin-sivu/listModues/ListItems.js
 * noin 5 pykälää returnia alapuolella.
 * 
 *   */ 
app.use(express.static(path.join(__dirname, 'public')));
/**
 * ---------------------------------------------------
 * /databases/lainat/ kansion funktiot
 * ---------------------------------------------------
 * 
 * /api/json-lainat tarkoittaa localhostin loppua:
 * localhost:3000/api/json-lainat
 * 
 * Palauttaa lainat/ kansion, esimerkki koodi löytyy
 * /src/pages/Adminsivu.js
 * funktiosta loadData();
 **/ 
app.get('/api/json-lainat', async (req, res) => {
    try {
      const data = await loadJsonLainat();
      console.log('Data received from Lainat, from:', req.ip);   
      res.json(data);
    } catch (error) {
      console.error('Error handling JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  });

  /**
  * Poistaa lainat kansiosta annetun kirjan.
  * Funktiolle pitää lähettää kirjan tunnus.
  * 
  * Esimerkkikoodia voi löytää:
  * /modules/admin-sivu/listModules/ListItems.js
  * Datan ottaminen funktiosta handleDelClick();
  * Lähettäminen funktiosta handleClick();
  */
  app.post("/api/json-lainat-deleteBook", async (req, res) => {
    try {
      const result = await moveLainaus(req.body);
      console.log(`file: ${result} deleted and moved succesfully, by`, req.ip)
    } catch (error) {
      console.error('Error handling JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  });

  /**
   * Päivittää lainauksen päivämäärän.
   * Funktiolle ottaa vastaan seuraavanlaisen
   * olion:
   * {
   *    tunnus: "abcd",
   *    date:   "2023-09-21"
   * }
   * 
   * Esimerkkikoodia voi löytää:
   * /modules/admin-sivu/listModules/ListItems.js
   * Datan ottaminen funktiosta handleDelClick();
   * Lähettäminen funktiosta handleClick();
   */
  app.post("/api/json-lainat-updateDate", async (req,res) => {
    try {
      console.log(req.body)
      // const result = await updateDateLainaus(req.body);
      console.log(`file: ${result}. Date changed succesfully, by`, req.ip)
    } catch (error) {
      console.error('Error handling JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  })
 



 /**
  * ---------------------------------------------------
  * /databases/lainattavat/ kansion funktiot
  * ---------------------------------------------------
  * 
  * Lisää uuden kirjan
  * 
  * Esimerkkikoodia voi löytää:
  * /src/modules/admin-sivu/AddBook.js
  * funktiosta handleClick();
 */
app.post('/api/json-addBook', async (req, res) => {
  try {
    console.log(req.file)
    await addJsonBook(req.body, req.file) // Lähettää kirjadatan
    console.log("Book added succesfully,  from:", req.ip)
    res.status(200).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




/**
 * Lisää kansikuvan.
 * 
 * Esimerkkikoodia voi löytää:
 * /src/modules/admin-sivu/AddBook.js
 * funktiosta handleClick();
*/


// Tallentaa annettuun kansioon annetulla nimellä
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/'); // Relatiivinen polku kansioon
  },
  filename: (req, file, cb) => {
    // Kuvan nimi
    const fileName = file.originalname // Ottaa kuvan nimen
    cb(null, fileName);
  },
});

const upload = multer({ storage });
app.post('/api/json-addBook-coverImage', upload.single('image'), async (req, res) => {
  try {
    // Katsoo tuliko tiedosto:
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    // Tiedoston nimi
    const filename = req.file.filename;

    // Lähettää reqin ja tiedostonimen
    await addJsonBookCover(filename, req.body)
    
    console.log('Bookcover added successfully, from:', req.ip);
    res.status(200).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  /**
   * Lukee lainattavat datan
   * Palauttaa lainat/ kansion, esimerkki koodi löytyy
   * /src/pages/Adminsivu.js
   * funktiosta loadData();
   */
  app.get('/api/json-lainattavat', async (req, res) => {
      try {
        const data = await loadJsonLainattavat();
        console.log('Data received from Lainattavat, from:', req.ip);
        res.json(data);
      } catch (error) {
        console.error('Error handling JSON data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    

  /**
   * Poistaa kirjan, ja päivittää id:eet
   * ja kirjan oman tiedoston
   * 
   * Esimerkkikoodin voi löytää:
   * /src/modules/admin-sivu/lainattavatModules/ListItems.js
   * funktiosta: handleClick();
   */
  app.post('/api/json-deleteBook', async (req, res) => {
    try {
      await deleteJsonBook(req.body) // Lähettää kirjan id:een funktiolle
      console.log("Book deleted succesfully,  from:", req.ip);
      res.status(200).json({message: 'Book deleted succesfully'});
    } catch (error) {
      console.error("Error deleting book:", error)
      res.status(500).json({error: "Internal Server Error"})
    }
  });

  /**
   * Päivittää kirjan uudet tiedot
   * 
   * Esimerkkikoon voi löytää
   * /src/modules/admin-sivu/lainattavatModules/ListItems.js
   * funktiosta: changeClick();
   */
  app.post('/api/json-saveChanges-lainattavat', async (req, res) => {
    try {
      await saveChangesLainattavat(req.body) // Lähettää kirjan id:een funktiolle
      console.log("Book information saved succesfully,  from:", req.ip);
      res.status(200).json({message: `Saves changed for ${req.body.nimi}`});
    } catch (error) {
      console.error("Error saving changes for lainattavat:", error)
      res.status(500).json({error: "Internal Server Error"})
    }
  });


  /**
   * Palauttaa lainaushistorian
   */
  
  app.get("/api/json-lainaushistoria", async (req, res) => {
    try {
      const data = await jsonHandleLainausHistoria();
      console.log('Data received from lainausHistoria, from:', req.ip);
      res.json(data);
    } catch (error) {
      console.error("Error saving changes for lainattavat:", error)
      res.status(500).json({error: "Internal Server Error"})
    }
  })


/**
 * Lainaa kirjan
 */
app.post("/api/json-teeLaina", async (req, res) => {
  try {
    const { lainaaja, kirjaNimi } = req.body;
    await teeLaina(lainaaja, kirjaNimi);
    console.log('Lainus tehty, from:', req.ip);
  } catch (error) {
    console.error("Error saving changes for lainattavat:", error)
    res.status(500).json({error: "Internal Server Error"})
  }
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});