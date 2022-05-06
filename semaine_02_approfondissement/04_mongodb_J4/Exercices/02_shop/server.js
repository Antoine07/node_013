import express from "express";
import mongoose from "mongoose";
import router from "./router.js";

const app = express();

// Connexion à la base de données
mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(startApp);

function startApp() {
  // Démarrage de l'app Express
  app.listen(8000, () => console.log(`App listening on http://localhost:8000`));
}

app.use(router);