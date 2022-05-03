import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import parite from './middlewares/parite.js';

// ==========
// App initialization
// ==========

const hostname = 'localhost';
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));
// app.use('/favicon.ico', (req, res, next) => { res.send('FAVICON!'); })

app.use('/check/:number', parite);

// ==========
// App routes
// ==========

app.get("/check/:number"/* , parite */, (req, res) => {
  res.json({ message: req.message });
});

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
