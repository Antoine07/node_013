import express from "express";
import homeController from '../controllers/home.js';
import kittenController from '../controllers/kitten.js';
const router = express.Router();
const app = express();
app.set('view engine', 'ejs');

router.get('/:shuffle?',homeController);

router.get('/kitten/:id', kittenController);

export default router;