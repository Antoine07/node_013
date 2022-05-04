import express from "express";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.get("/dashboard", isLoggedAsSimpleUser, (req, res) => {
    res.send('<h1>Bienvenue utilisateur !</h1>');
});

router.get("/dashboard/admin", isLoggedAsAdmin, (req, res) => {
    res.send('<h1>Bienvenue admin !</h1>');
});

export default router;

function isLoggedAsSimpleUser (req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send('You must be logged in!');
    }

    // "Bearer <token>"
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== "Bearer") {
        return res.status(400).send('Token not recognized!');
    }

    // Vérifier le json web token
    try {
        const decodedToken = jsonwebtoken.verify(token, 'CLE_SECRETE');

        if (decodedToken.role !== 'User') {
            return res.status(400).send('Not a User!');
        }

        req.decodedToken = decodedToken;

        next();
    } catch (error) {
        return res.status(403).send('Invalid token!<br>' + error.message);
    }
};

function isLoggedAsAdmin (req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send('You must be logged in!');
    }

    // "Bearer <token>"
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== "Bearer") {
        return res.status(400).send('Token not recognized!');
    }

    // Vérifier le json web token
    try {
        const decodedToken = jsonwebtoken.verify(token, 'CLE_SECRETE');

        if (decodedToken.role !== 'Admin') {
            return res.status(400).send('Not an Admin!');
        }

        req.decodedToken = decodedToken;

        next();
    } catch (error) {
        return res.status(403).send('Invalid token!<br>' + error.message);
    }
};