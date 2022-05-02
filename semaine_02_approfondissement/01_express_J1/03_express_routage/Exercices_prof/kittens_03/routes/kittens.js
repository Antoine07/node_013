import express from "express";
import fs from "fs";
const router = express.Router();

const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

router.get("/", (req, res) => {
  const kittens = JSON.parse(fs.readFileSync(`./Data/kittens.json`, "utf-8"));
  let k = "";
  for (const { id, name, image } of kittens) {
    k += `
      <div class="kitten">
        <a href="/kitten/${id}">${name}</a>
        <img  src="${BASE_URL}/images/${image}" />
      </div>
      `;
  }
  res.send(
    `<html>
      <head>
        <meta charset="utf-8" />
        <title>Ajoutez un utilisateur</title>
        <link rel="stylesheet" href="${BASE_URL}/css/styles.css" type="text/css" />
      </head>
      <body>
        <div class="container">
          <nav>
            <ul>
              <li>Kittens</li>
              <li><a class="active">Home</a></li>
            </ul>
          </nav>
        </div>
        <div class="container">${k}</div>
      </body>
    </html>`
  );
});

router.get("/kitten/:id", (req, res) => {
  const { id } = req.params;
  try {
    const kitten = JSON.parse(fs.readFileSync(`./Data/${id}.json`, "utf-8"));
    const { name, image, age, description } = kitten;

    res.send(
      `<html>
        <head>
          <meta charset="utf-8" />
          <title>Ajoutez un utilisateur</title>
          <link rel="stylesheet" href="${BASE_URL}/css/styles.css" type="text/css" />
        </head>
        <body>
          <div class="container">
            <nav>
              <ul>
                <li>Kittens</li>
                <li><a href="/">Home</a></li>
              </ul>
            </nav>
          </div>
          <div class="container">
            <div>
              <h2>${name}</h2>
              <p>Age :${age}</p>
              <p>${description}</p>
              <img src="${BASE_URL}/images/${image}" />
            </div>
          </div>
        </body>
      </html>     
      `
    );
  } catch (err) {
    // gestion de la page 404
    res.status(404).send("Sorry cant find that!");
  }
});

export default router;
