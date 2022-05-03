const pug = require('pug');

let user = { isAdmin: true };

try {
    const renderTemplate = pug.compileFile('template.pug');
    const result = renderTemplate({ user });
    console.log(result);
} catch (err) {
    console.log('Erreur lors de la compilation :\n');
    console.log(err.message);
}