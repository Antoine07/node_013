import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import PostController from "../controllers/login.js";
import DashboardController from "../controllers/dashboard.js";

import authMiddleware from "../middlewares/auth.js";

router.get("/", HomeController);
router.post("/login", PostController);
router.get("/dashboard", authMiddleware, DashboardController);
router.get("/logout", (req, res) => {
    req.session.auth = false;

    res.redirect('/');
});

export default router;
