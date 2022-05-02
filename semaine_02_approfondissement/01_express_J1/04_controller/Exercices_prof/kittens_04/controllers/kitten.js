import dotenv from 'dotenv';
import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const {
  APP_LOCALHOST : hostname,
  APP_PORT: port
} = process.env;

export default (req, res) => {
  const { id } = req.params;
  try {
    const kittensFile = path.join(path.dirname(fileURLToPath(import.meta.url)), `../Data/${id}.json`);
    const kitten = JSON.parse(
      fs.readFileSync(kittensFile, "utf-8")
    );
    const { name, image, age, description } = kitten;

    res.send(
      `<html>
        <head>
          <meta charset="utf-8" />
          <title>Ajoutez un utilisateur</title>
          <link
            rel="stylesheet"
            href="http://${hostname}:${port}/css/styles.css"
            type="text/css"
          />
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
              <img src="http://${hostname}:${port}/images/${image}" />
            </div>
          </div>
        </body>
      </html>`
    );
  } catch (err) {
    // gestion de la page 404
    res.status(404).send("Sorry cant find that!");
  }
};
