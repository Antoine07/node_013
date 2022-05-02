import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from "fs";

// la logique métier
import { shuffle } from "./utils/shuffle.js";

// constantes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 8000;

const kittens = JSON.parse(readFileSync(`${__dirname}/Data/kittens.json`));

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/:shuffle?", (req, res) => {
    if(req.params.shuffle){
        shuffle(kittens);
    }
    res.render('home', { kittens })
});

app.get("/kitten/:id", (req, res) => {
    const { name, age, image, description } = kittens.find(k => k.id === parseInt( req.params.id ));

    res.render('kitten', { name, age, image, description })
});

app.get("/shuffle", (req, res) => {
   
    res.render('home', { kittens : shuffle(kittens) })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});