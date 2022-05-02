import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from "fs";

import { shuffle } from "./../utils/shuffle.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kittens = JSON.parse(readFileSync(`${__dirname}/../Data/kittens.json`));
const app = express();


app.set('view engine', 'ejs');

router.get('/:shuffle?', (req, res) =>{
  if(req.params.shuffle){
    shuffle(kittens);
}
res.render('home', { kittens })
});

router.get('/kitten/:id', (req, res) =>{
  res.send('About birds');
});

export default router;