import http from 'http';
import { readFileSync } from 'fs';
import ejs from 'ejs';

import users from './src/Data/users.js';
import { showUser, shuffle } from './src/utils.js';

const hostname = 'localhost';
const port = '8080';

const server = http.createServer((req, res) => {
    const url = req.url.replace('/', '');

    if (url === 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });

        res.end();
        return;
    }

    if (url === '') {

        res.writeHead(200, { 'Content-Type': 'text/html' });

        // str c'est la vue compilée avec les données
        ejs.renderFile('./views/index.ejs', {users}, {},  function(err, str){
            // str => Rendered HTML string
            res.end(str); // la requete est finie pas de boucle infinie
        });

        return;
    }

    if (url === 'shuffle') {
        shuffle(users);

        res.end(`
        <!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <title>Shuffle</title>
            <link href="/assets/style.css" rel="stylesheet">
            </head>
            <body>
            ${showUser(users)}
            </body>
        </html>
`);

        return;
    }

    if(url === 'assets/style.css'){
        res.writeHead(200, { "Content-Type": "text/css" });
        console.log(url);
        const fileCSS = readFileSync('./assets/styles.css', 'utf8');
        // res.write(fileCSS);
        res.end(fileCSS);

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/plain",
    });
    res.end("Page not found");

});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});