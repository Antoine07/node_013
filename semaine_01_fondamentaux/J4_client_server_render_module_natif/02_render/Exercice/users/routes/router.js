import { readFileSync } from 'fs';
import ejs from 'ejs';
import students from '../Models/students.js';
import homeController from '../controllers/home.js';

let message = '';

export default (req, res) => {
    const url = req.url.replace('/', '');
    const names = students.map( student => student.name.toUpperCase() );

    if (url === 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });

        res.end();
        return;
    }

    if (url === '') {
        homeController(req, res);
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

}