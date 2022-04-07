
import ejs from 'ejs';

let message = '';

export default function(req, res){

    res.writeHead(200, { 'Content-Type': 'text/html' });

    // str c'est la vue compilée avec les données
    ejs.renderFile('./views/home.ejs', { message }, {}, (err, str) => {
        res.end(str);
    });
}