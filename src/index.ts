import express from 'express';
import csv from 'csvtojson';
import { promises as fs } from 'fs';
import { json } from 'stream/consumers';

const app = express();
const port = 3000;

const filePath = './users.csv';
const outPutPath = 'users.json';

app.get('/convert', (req, res) => {
  res.send('Converting completed!');
  csv()
    .fromFile(filePath)
    .then((jsonObj) => {
      let newJson = jsonObj.map(
        (item: { first_name: string; last_name: string; phone: string }) => {
          let first = item.first_name;
          let last = item.last_name;
          let phone = item.phone;
          if (phone === '') {
            phone = 'The phone number is unknown';
          }
          return { first, last, phone };
        }
      );
      fs.writeFile(outPutPath, JSON.stringify(newJson));
    });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
