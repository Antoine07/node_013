import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";

// ==========
// App initialization
// ==========

const hostname = "localhost";
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    name: "ma-session",
    secret: "ma-session-secrete",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessions",
    }),
  })
);

// ==========
// App routes
// ==========

app.get("/", (req, res) => {
  if (!req.session.counter) {
    req.session.counter = 0;
  }

  req.session.counter++;

  res.json({ counter: req.session.counter });
});

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
