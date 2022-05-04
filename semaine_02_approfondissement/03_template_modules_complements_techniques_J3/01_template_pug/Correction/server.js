import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from './posts.js';

// ==========
// App initialization
// ==========

const hostname = 'localhost';
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'pug');

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));

// ==========
// App routes
// ==========

app.get("/", (req, res) => {
  res.render('pages/index', {
    posts,
  });
});


// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
