import express from "express";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.get("/token/admin", (req, res) => {
    const token = jsonwebtoken.sign({
        id: 42,
        name: 'Jose',
        role: 'Admin'
    }, 'CLE_SECRETE');

    res.json({ token });
});

router.get("/token/user", (req, res) => {
    const token = jsonwebtoken.sign({
        id: 42,
        name: 'Jose',
        role: 'User'
    }, 'CLE_SECRETE');

    res.json({ token });
});

export default router;