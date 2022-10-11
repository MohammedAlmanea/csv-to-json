"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const fs_1 = require("fs");
const app = (0, express_1.default)();
const port = 3000;
const filePath = './users.csv';
const outPutPath = 'users.json';
app.get('/convert', (req, res) => {
    res.send('Converting completed!');
    (0, csvtojson_1.default)()
        .fromFile(filePath)
        .then((jsonObj) => {
        let newJson = jsonObj.map((item) => {
            let first = item.first_name;
            let last = item.last_name;
            let phone = item.phone;
            if (phone === '') {
                phone = 'The phone number is unknown';
            }
            return { first, last, phone };
        });
        fs_1.promises.writeFile(outPutPath, JSON.stringify(newJson));
    });
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
