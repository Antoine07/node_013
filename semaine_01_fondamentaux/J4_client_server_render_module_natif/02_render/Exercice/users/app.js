import http from 'http';
import { readFileSync } from 'fs';
import ejs from 'ejs';

const hostname = 'localhost';
const port = '8080';

let students = [
    { name: "Sonia" },
    { name: "Antoine" }
];

let message = '';

const server = http.createServer((req, res) => {
    const url = req.url.replace('/', '');
    const names = students.map( student => student.name.toUpperCase() );
    console.log(url, req.method)
    if (url === 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });

        res.end();
        return;
    }

    if (url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // str c'est la vue compilée avec les données
        ejs.renderFile('./views/home.ejs', { message }, {}, (err, str) => {
            res.end(str);
        });

        return;
    }

    if (url === 'bootstrap') {
        res.writeHead(200, { "Content-Type": "text/css" });
        const fileCSS = readFileSync('./assets/css/bootstrap.min.css', 'utf8');
        // res.write(fileCSS);
        res.end(fileCSS);

        return;
    }

    if (url === 'add' && req.method === 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });

        req.on('end', () => {
            const [name, value] = body.split('=').map(d => d.trim());

            if (value == '') {
                message = 'Attention votre champ est vide';
            } else if (names.includes(value.toUpperCase()) ) {
                message = `Cet étudiant est déjà dans la liste ${value}`;
            } else {
                message = '';
                students.push({ [name]: value });
            }
            res.writeHead(301, {
                'Location': '/'
            });
            res.end();
        });

        return;
    }

    if (url === 'delete' && req.method === 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            const [name, value] = body.split('=').map(d => d.trim());
            students = students.filter(s => s.name !== value.trim());
            message =`Suppression réussi de ${value}`;

            res.writeHead(301, {
                'Location': '/'
            });
            res.end();
        });

        return;
    }

    if (url === 'students' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        ejs.renderFile('./views/students.ejs', { students }, {}, (err, str) => {
            res.end(str);
        });

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