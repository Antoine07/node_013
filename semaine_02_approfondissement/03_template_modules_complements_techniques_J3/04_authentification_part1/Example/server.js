import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import jsonwebtoken from "jsonwebtoken";
import tokenController from "./tokenController.js";
import routes from "./routes.js";

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

// ==========
// App routes
// ==========

app.use(tokenController);
app.use(routes);

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
