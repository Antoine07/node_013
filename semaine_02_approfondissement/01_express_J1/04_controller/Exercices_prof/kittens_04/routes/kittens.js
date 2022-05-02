import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import KittenController from "../controllers/kitten.js";

router.get("/", HomeController);

router.get("/kitten/:id", KittenController);

export default router;