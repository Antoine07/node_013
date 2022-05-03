import express from 'express'

const app = express();

const is_admin = false;

const authMiddleware = (req, res, next) => {
    console.log('req', req);
    if (!is_admin) {
        return res.status(403).send('Non autorisé à accéder à l\'application');
    }
    next();
};

app.use('/admin', authMiddleware);

app.get('/', (req, res) => {
    res.send('Hello Home!');
});

app.get('/contact', (req, res) => {
    res.send('My name is JM');
});

app.get('/admin', (req, res) => {
    res.send('BIenvenue admin');
});

app.get('/admin/post', (req, res) => {
    res.send('Admin : créer un post');
});


app.listen(8000, () => console.log('App listening on http://localhost:8000'));