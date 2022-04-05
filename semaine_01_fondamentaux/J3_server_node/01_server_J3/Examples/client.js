const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// envoi d'une requête vers le serveur définit plus bas.
http.get(`http://${hostname}:${port}`, res => {

  let data = '';

  // recevoir les données par morceaux : Buffer reçu du serveur qui sert la requête
  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => console.log(data));
});