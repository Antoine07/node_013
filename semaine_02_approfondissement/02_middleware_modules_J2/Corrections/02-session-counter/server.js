import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import session from "express-session";

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

app.use(session({
  name: 'ma-session',
  secret: 'mon-secret-session',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "public")));

// ==========
// App routes
// ==========

app.get("/", (req, res) => {
  
  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1;
  }

  if (req.session.counter >= 10) {
    return res.redirect('/check');
  }

  res.send({ counter: req.session.counter });

});

app.get('/check', (req, res) => {

  res.send({
    session: req.session
  });
  
});

app.get('/delete', (req, res) => {
  req.session.destroy();

  res.send({
    message: 'Session destroyed!'
  });
});

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
