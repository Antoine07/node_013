import express from "express";
import { ProductModel } from "./Product.model.js";

const router = express.Router();

router.get("/", getHome);
router.get("/all", getAll);
router.get("/delete/:name", getDelete);
router.get("/show/:name", getShow);

async function getHome(req, res) {
    try {
        const companies = await ProductModel.find({}, {__v:0});
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function getAll(req, res) {
    res.send("Hello All");
}
async function getDelete(req, res) {
    res.send("Hello Delete");
}
async function getShow(req, res) {
    res.send("Hello Show");
}

export default router;