import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kittens = JSON.parse(readFileSync(`${__dirname}/../Data/kittens.json`));

export default (req, res) => {
    const { name, age, description, image } = kittens.find(k => k.id === parseInt(req.params.id))

    res.render('kitten', { name, age, description, image });
}