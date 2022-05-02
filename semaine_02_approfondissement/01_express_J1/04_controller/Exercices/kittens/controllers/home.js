import { shuffle } from "./../utils/shuffle.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kittens = JSON.parse(readFileSync(`${__dirname}/../Data/kittens.json`));

export default (req, res) => {
    if (req.params.shuffle) {
        shuffle(kittens);
    }
    res.render('home', { kittens })
}