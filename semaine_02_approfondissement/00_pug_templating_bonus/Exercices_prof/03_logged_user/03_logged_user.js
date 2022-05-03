const pug = require('pug');

const loggedUser = {
    name: {
        first: 'Jean',
        last: 'Dupont',
    },
    age: 36,
    birthdate: new Date('1986-04-18'),
    location: {
        zipcode: '77420',
        city: 'Champs-sur-Marne',
    },
    isAdmin: true
};

try {
    const renderTemplate = pug.compileFile('template.pug', { pretty: true });
    const result = renderTemplate({ loggedUser });
    console.log(result);
} catch (err) {
    console.log('Erreur de compilation :\n');
    console.log(err.message);
}