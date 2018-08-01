const fs = require('fs');
const path = require('path');
const csv = require('csvtojson/v2');

// use path to ensure the code works on any platform
const csvToJsonConverter = (pathToFile = path.join(__dirname, 'customer-data.csv')) => {
  // check if file is csv
  if (!/\.csv/.test(pathToFile)) {
    console.log('The file provided is not a csv file');
    return;
  }

  // catch any error that occurs in the conversion process. e.g. if csv file is non-existent
  csv()
    .fromFile(pathToFile)
    .then(jsonObject => {
      // get the filename from the file path
      const filename = path.basename(pathToFile, '.csv');

      // use JSON.stringify to convert the json object to a readable format as per the assignement requirement
      fs.writeFileSync(path.join(__dirname, `${filename}.json`), JSON.stringify(jsonObject, null, ' '));

      console.log(`The converted results have been saved in ${filename}.json`);
    })
    .catch(error => {
      console.log('Error =>', error.message);
    });
}

// call the function and get the url passed via the command line using process.argv
csvToJsonConverter(process.argv[2]);
