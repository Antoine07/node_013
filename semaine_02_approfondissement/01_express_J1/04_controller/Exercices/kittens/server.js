import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

import kittens from "./routes/kittens.js";

// constantes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 8000;

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', kittens);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});