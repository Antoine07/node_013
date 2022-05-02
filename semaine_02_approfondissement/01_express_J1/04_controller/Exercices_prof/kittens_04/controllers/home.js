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
  const kittensFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '../Data/kittens.json');

  const kittens = JSON.parse(
    fs.readFileSync(kittensFile, "utf-8")
  );
  let k = "";
  for (const { id, name, image } of kittens) {
    k += `
            <div class="kitten">
              <a href="/kitten/${id}">${name}</a>
              <img  src="http://${hostname}:${port}/images/${image}" />
            </div>
            `;
  }
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
              <li><a class="active">Home</a></li>
            </ul>
          </nav>
        </div>
        <div class="container">${k}</div>
      </body>
    </html>`
  );
};
