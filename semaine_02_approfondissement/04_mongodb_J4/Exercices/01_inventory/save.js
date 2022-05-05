import mongoose from "mongoose";

import { ProductModel } from './Product.model.js';
import { ArticleModel, CategoryModel } from "./Shop.model.js";
import products from './Data/inventory.js';

// Connexion à la base
mongoose.connect('mongodb://localhost:27017/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(examplePopulate);

async function init() {

    try {
        
        // Supprime tous les produits
        await ProductModel.deleteMany({});
        console.log(`Collection truncated!\n`);

        // Inserer tous les produits de ./inventory.js
        await ProductModel.insertMany(products);
        console.log(`${products.length} products inserted!\n`);

        // Récupère les documents insérés
        const companies = await ProductModel.find({},
            {_id:0, society:1, price:1, qty:1 });
        console.log(`Companies:`, companies, '\n');

        // Supprime le 1er document dont le nom de société correspond à "Alice
        const removed = await ProductModel.deleteMany({ society: "Alice" });
        console.log(`Deleted Alice:`, removed, '\n');
        
        // Multiplie par 2 la quantité de chaque document
        await ProductModel.updateMany({}, { $mul: { qty: 2 } });
        console.log(`Quantity multiplicated by 2!\n`);

        // Récupère les documents insérés
        const companies2 = await ProductModel.find({ qty: { $gte: 100 } },
            {_id:0, society:1, price:1, qty:1 });
        console.log(`Companies:`, companies2, '\n');

    }
    catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
    }

}

async function examplePopulate() {

    await ArticleModel.deleteMany({});
    await CategoryModel.deleteMany({});

    const cat = await CategoryModel.create({
     categoryName: 'Chaussures'
    });

    await ArticleModel.create({
        productName: 'Nike Air Force One',
        category: cat._id
    });

    // Récupère les articles avec leurs category grâce à .populate()

    const articles = await ArticleModel.find().populate('category');
    console.log(articles);

}