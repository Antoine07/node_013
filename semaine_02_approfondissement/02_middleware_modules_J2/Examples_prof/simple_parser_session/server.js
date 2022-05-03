import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import session from "express-session";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const hostname = 'localhost';
const port = 8000;

app.use(session({
  name: 'ma-session',
  secret: 'ma-session-secrete',
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/postdata', (req, res) => {
  console.log('req body = ', req.body);

  res.send('Données envoyées!');
});

app.get('/login/:username', (req, res) => {

  req.session.user = { name: req.params.username };

  res.send(`Bienvenue à toi ${req.session.user.name}`);
});

app.get('/whoami', (req, res) => {
  if (!req.session.user) {
    return res.send('Je ne vous connais pas. Allez voir /login/:username svp');
  }

  res.send(`Hey je te connais! Tu t'appelles ${req.session.user.name}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});