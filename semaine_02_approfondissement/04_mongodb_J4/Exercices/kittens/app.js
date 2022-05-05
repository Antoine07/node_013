import express from "express";
import mongoose from "mongoose";
import CatModel from "./cat.model.js";

// Connexion à la BDD MongoDB
mongoose
    .connect('mongodb://localhost:27017/kittens',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(init);

// Initialisation de l'app Express
const app = express();

// Lister les chats en JSON
app.get('/', async (req, res) => {
    const cats = await CatModel.find({});
    res.json(cats);
});

app.get('/create-cat/:name/:breed', async (req, res) => {
    const { name, breed } = req.params;

    const newCat = await CatModel.create({ name, breed });
    await newCat.save();
    
    res.json({
        message: `Cat ${name} succesfully created!`
    });
});

app.get('/update-cat/:id/:name/:breed', async (req, res) => {
    const { id, name, breed } = req.params;

    // await CatModel.updateOne({ _id: id }, { name, breed });
    await CatModel.findByIdAndUpdate(id, { name, breed });

    res.redirect('/');
});

app.get('/delete-cat/:id', async (req, res) => {
    const { id } = req.params;

    await CatModel.findByIdAndRemove(id);

    res.redirect('/');
});

async function init() {
    console.log('Connexion à la base MongoDB initialisée!');

    /* const cat = {
        name: 'Stuart',
        breed: 'Persan'
    };

    const myCat = await CatModel.create(cat);
    myCat.save(); */

    // Démarrage de l'app Express
    app.listen(8000, () => console.log('App listening on http://localhost:8000'));
}