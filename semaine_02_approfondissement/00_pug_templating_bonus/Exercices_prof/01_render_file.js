const pug = require('pug');

let user = { isAdmin: true };

pug.renderFile('template.pug', { user }, (err, data) => {
    if (err) {
        console.log('Erreur lors de la compilation :\n');
        console.log(err.message);
        return;
    }
    console.log(data);
});