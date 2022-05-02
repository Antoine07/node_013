import express from "express";
import kittens from "./routes/kittens.js";

const app = express();
const port = 8000;
const hostname = "localhost";

app.use(express.static("public"));

app.use('/', kittens);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
