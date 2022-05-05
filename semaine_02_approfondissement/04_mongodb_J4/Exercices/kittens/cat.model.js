import mongoose from "mongoose";

// Création du schéma mongoose premettant de structurer un "Cat"
const CatsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    breed: { type: String, default: 'Unknown' }
});

// Récupération d'un Model mongoose sur la base du Schéma
const CatModel = mongoose.model("cats", CatsSchema, "cats");

export default CatModel;