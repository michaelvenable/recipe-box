/**
 * Combines separate JSON files into one file. The objects in the individual files are placed in one large
 * array in
 * the output file. This is used to combine the individual recipes into one large array object.
 */

const fs = require('fs');

const inputDirectoryPath = './recipes';
const outputFilePath = './public/data.json';

(async () => {
  try {
    const data = [];

    const inputFiles = await fs.promises.readdir(inputDirectoryPath);

    for (let file of inputFiles) {
        console.debug(`Reading file: ${inputDirectoryPath}/${file}`);
        const fileContents = await fs.promises.readFile(`${inputDirectoryPath}/${file}`);
        const recipe = JSON.parse(fileContents.toString());
        data.push(recipe);
    }

    console.debug(`Writing ${data.length} recipes to ${outputFilePath}.`);
    await fs.promises.writeFile(outputFilePath, JSON.stringify(data, undefined, 2));
  } catch (e) {
    console.log("Error: ", e);
  }
})();