const fs = require("fs");

function checkLateLainat() {
  const pathToFolder = "./src/databases/lainat";
  try {
    const files = fs.readdirSync(pathToFolder);
    let results = [];
    Promise.all(
      files.map(async (file) => {
        try {
          const path = `${pathToFolder}/${file}`;
          const data = await JSON.parse(fs.readFileSync(path, "utf-8"));

          // Parse the date components correctly for dd/mm/yyyy format
          const dateComponents = data.viimpalautuspv.split("/");
          const day = dateComponents[0];
          const month = dateComponents[1];
          const year = dateComponents[2];
          const formattedDateString = `${month}/${day}/${year}`;

          const targetDate = new Date(formattedDateString);
          const currentDate = new Date();

          if (currentDate > targetDate) {
            console.log(`Book in file ${file} is late.`);
            
          }
        } catch (error) {
          console.error(`Error reading or processing file ${file}:`, error);
        }
      })
    ).catch((error) => {
      console.error("Error processing files:", error);
    });
  } catch (error) {
    console.error("Error reading directory:", error);
  }
}

checkLateLainat();