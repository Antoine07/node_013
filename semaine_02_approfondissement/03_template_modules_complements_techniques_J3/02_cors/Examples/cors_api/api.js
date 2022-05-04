import express from "express";
import dotenv from "dotenv";

dotenv.config();
const { APP_LOCALHOST_B: hostname, APP_PORT_B: port } = process.env;
const app = express();

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');  // J'autorise le domaine localhost:8000 à faire des requêtes Ajax sur moi
  next();
}); */

app.get("/c", (req, res) => {
  const users = [
    { name: "Leanne Graham b" },
    { name: "Ervin Howell b" },
    { name: "Clementine Bauch b" },
    { name: "Patricia Lebsack b" },
  ];
  res.json({ users });
});

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
