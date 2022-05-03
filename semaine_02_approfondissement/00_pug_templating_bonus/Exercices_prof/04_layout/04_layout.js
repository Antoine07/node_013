const pug = require('pug');

const menuItems = [
    { path: '/', title: 'Home', isActive: true },
    { path: '/about-me', title: 'About', isActive: false },
    { path: '/references', title: 'References', isActive: false },
    { path: '/contact-me', title: 'Contact', isActive: false },
];

try {
    const renderTemplate = pug.compileFile('template.pug', { pretty: true });
    const result = renderTemplate({ menuItems });
    console.log(result);
} catch (err) {
    console.log('Erreur de compilation :\n');
    console.log(err.message);
}