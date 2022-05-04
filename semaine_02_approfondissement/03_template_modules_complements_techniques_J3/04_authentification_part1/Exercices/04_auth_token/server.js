import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();
const {
  APP_LOCALHOST: hostname,
  APP_PORT: port,
  APP_SECRET: secret_key
} = process.env;

const app = express();

app.use(session({
  name: 'simple',
  secret: 'simple',
  resave: false,
  saveUninitialized: true
}));

/**
 * Route principale (pour le confort de test de l'app)
 * Nul besoin de modifier cette route
 */
app.get("/", (req, res) => {
  res.send(`
    <style>html { font-size: 1.6rem; }</style>
    <h1>Routes de l'app</h1>

    <keygen>${req.session.token ? `Token = ${req.session.token}` : ''}</keygen>

    <ul>
      <li><a href="/getToken">/getToken</a> (Crée un token et le met dans la session)</li>
      <li><a href="/clear">/clear</a> (Efface la session et le token)</li>
    </ul>

    <ul>
      <li><a href="/securedRoute">/securedRoute</a> (Route accessible uniquement avec un token valide dans la session)</li>
    </ul>
  `);
});


app.get('/getToken', (req, res) => {
  const userId = Date.now();
  
  // Générer un nouveau token, et le mettre en session
  const token = jsonwebtoken.sign(
    { userId, email: 'jmclery@gmail.com', role: 'Admin' },
    secret_key,
    { expiresIn: '24h' }
  );

  req.session.token = token;

  res.json({ token });

});

app.get('/clear', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    res.json({ message: 'Session and token cleared successfuly!' });
  });
});

const authMiddleware = (req, res, next) => {

  if (!req.session.token) {
    return res.status(403).json({
      message: 'You should be logged and have a valid token'
    });
  }

  try {
    const verifiedToken = jsonwebtoken.verify(req.session.token, secret_key);

    console.log('Token is valid!', verifiedToken);

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
};

app.get('/securedRoute', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted! Token is valid!' });
});

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
