# Configuration 

Dans la suite du cours nous allons installer Babel afin de pouvoir utiliser la syntaxe ES6 dans le contexte Node.js.

Babel est un transcompilateur, il permettra de convertir le code ES6 en un code rétro-compatible JS pouvant s'exécuter par des moteurs plus ancien JS.

## Installation

- Installez le projet suivant : kittens dans votre dossier Exercices de ce chapitre. Nous vous rappelons les commandes ci-dessous :

```bash
npm init -y
```

- Pour Babel nous aurons besoin de ces deux dépendances 

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/node
```

- @babel/core spécifie un environnement et active les plugins nécessaires 

- @babel/preset-env c'est une CLI

- @babel/node est une API 

Vous devez maintenant créer un nouveau fichier **.babelrc**, ce fichier est un fichier de configuration pour Babel, il indique que nous souhaitons utiliser la syntaxe moderne de JS et qu'il doit transpiler le code vers un code compatible pour tous les navigateurs.

```json
{
    "presets": ["@babel/preset-env"]
}
```

Par ailleurs, comme la transpilation du code se fait grâce à Babel, nous allons également indiquer dans la partie scripts de notre fichier package.json que l'on souhaite l'exécuter au démarrage de notre nodemon :

```json
 "scripts": {
    "start": "nodemon --exec babel-node server.js"
  },
```

Pensez à changer le nom du point d'entrée dans le fichier package.json de votre application :

```json
"main": "server.js",
```

## 01 Exercice import & export

Attention, on ne vous demande pas de créer ici un serveur Node.js comme vu en cours. Nous allons tester uniquement une nouvelle syntaxe ES6 d'import/export de fichiers pour voir si tout est bien installé.

Créez un dossier utils et un fichier hello.js. Définissez une fonction hello elle prendra un unique paramètre message. 

Voyez les deux exemples d'export et d'import ci-dessous 

- export

```js
export const hello;
```

- import dans le fichier server.js

```js
import { hello } from './src/utils';
```

Lancez l'application et affichez en console le message de la fonction hello.


Rappels sur les imports/exports

Vous pouvez exporter plusieurs éléments et les importer dans d'autres fichiers, dans ce cas la syntaxe de l'export et l'import est celle que nous venons de voir. Vous pouvez également faire un export par défaut. Uniquement un par fichier dans ce cas :

```js

export default Model;

```

Et l'import dans un autre fichier :

```js
import MyModel from './utils/model';

```

## 01 Exercice

Créez un modèle Kitten, une classe par exemple, dans votre serveur express et ajouter à l'aide d'un formulaire des chats dans un tableau de type Kitten (modèle). On voudrait avoir un tableau de kittens bien formaté que l'on pourra afficher dans une page de votre choix.

Contraintes : utilisez ejs, pour se faire suivez la recette suivante, dans votre serveur Express indiquez que vous utiliser un moteur de template spécifique en l'occurence **ejs** ici.

```js
// ajoute EJS à Express
app.set('view engine', 'ejs');
```

Pour afficher un render HTML vous utiliserez dans la méthode get la syntaxe suivante, fonction render ajoutée par la méthode set plus haut et maintenant disponible dans Express. 

```js
// comme réponse pour une route donnée
res.render('home', {kittens})
```

