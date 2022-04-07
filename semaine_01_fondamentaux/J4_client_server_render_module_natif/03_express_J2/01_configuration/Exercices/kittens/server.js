import express from 'express';
import { hello } from './src/utils';

// instance du framework express 
const app = express();
const port = 8000;

const kittens = [];

app.set('view engine', 'ejs');

// gère toutes les routes GET POST DELETE MIDDLEWARE
app.all('/',  (req, res, next) =>{
    console.log('Accessing the secret section ...');
    if(true)
        next(); // PASSE LE CONTROLE AU MIDDLEWARE pour la même URL 
    res.redirect('/bad')
});

// gestion des routes
app.get("/", (req, res, next) => {
// envoi au client de la réponse
   // res.json({ message : hello()})
    console.log("CONNECT");

    next();
});

app.get('/', (req, res) => {

    res.render('home', {message : ['un message']});
})

app.get('/bad', (req, res) => {
    res.json({ error : "BAD" })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});