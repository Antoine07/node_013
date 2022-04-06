import http from 'http';
import { readFileSync } from 'fs';
import { avg , setMention } from './src/utils.js'

const hostname = 'localhost';
const port = '8080';

const allStudents = JSON.parse(readFileSync('./Data/all.json', 'utf-8'));
const namesUri = allStudents['students'].map(st => st.name.toLowerCase());


const server = http.createServer((req, res) => {
    const url = req.url.replace('/', '');

    // url all
    if (url === 'all') {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });

        // il faut par contre renvoyer une chaîne de caractères
        res.end(JSON.stringify(allStudents));

        return;
    }

    // search/name attention on retire le search/ = 7 caractères dans la politique de nos url
    if (namesUri.includes(url.slice(7))) {
        const name = url.slice(7);
        const student = JSON.parse(readFileSync(`./Data/${name}.json`, 'utf-8'));
        
        const avgStudent = avg( student['notes'] );
        const mention = setMention( avgStudent );

        student['avg'] = avgStudent;
        student['mention'] = mention;

        res.end(JSON.stringify(student));

        return;
    }

    res.writeHead(404, {
        "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "404 Not Found" }));

});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});