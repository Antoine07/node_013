import express from 'express';
import { Kitten } from './src/KittenModel';

// instance du framework express 
const app = express();
const port = 8000;

const kittens = [];

// moteur de template => méthode render pour afficher le rendu des pages compilées
app.set('view engine', 'ejs');

// dossier public pour les fichiers dit statiques comme les assets
app.use(express.static('public'));

// accèder au données depuis le body en JSON
app.use(express.json());
// envoyer les données POST à la route post
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home', { count: kittens.length });
});

app.get('/kittens', (req, res) => {
    res.render('kittens', { kittens });
});

app.post('/add', (req, res) => {
    const { name, age } = req.body;
    const newKitten = new Kitten({name, age});

    kittens.push(newKitten);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});