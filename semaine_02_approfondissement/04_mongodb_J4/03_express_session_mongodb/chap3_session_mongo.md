# Session & MongoDB

Dans le cadre d'une mise en **production** nous allons faire une remarque sur la consommation de la mémoire dans l'utilisation des sessions.

Lorsque vous utilisez les sessions avec Express et que vous souhaitez enregistrer des informations dans celles-ci, il faut faire attention à la gestion de la mémoire. En JS vous n'avez pas la possiblité sur un serveur Node.js de stocker des données indéfiniments. C'est pourquoi nous vous conseillons dans le cadre de la mise en production d'une application Express d'utiliser **MongoDB** pour **enregistrer** vos données de session, même de manière temporaire.

## Installation du module connect-mongo

Il existe de nombreuses solutions pour faire persister nos sessions en Base de données, nous choisissons **connect-mongo** que nous connaissons bien.

```bash
npm install connect-mongo
```

Definissez vos sessions comme suit, maintenant elles utiliserons MongoDB pour enregistrer les valeurs.

```js
import session from 'express-session';
import MongoStore from 'connect-mongo';

app.use(session({
  name : 'simple',
  secret : 'simple',
  resave :true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl:"mongodb://localhost:27017/counter" }),
  cookie : { maxAge : 180 * 60 * 1000 } // on détermine la durée de vie de la session
}));
```

Vous pouvez maintenant, utiliser les sessions classiquement dans votre code :

```js

app.get('/login', (req, res) => {
  req.session.auth = true;
})
```

## 02 Exercice mise en pratique

Créez un compteur qui utilise une base de données et les sessions comme décrit dans cette partie du cours. Partez du modèle Express **simple_00**.

Que constatez-vous lorsque vous re-lancer le serveur en ce qui concerne la valeur du counter ?

Vérifiez en base de données que vous avez bien une base créée et un counter qui s'incrémente.

Pensez, pour terminer l'exercice, à écraser la valeur du counter lors de la redirection, vous n'avez pas à vous souciez de MongoDB, cette partie est transparente dans la gestion des sessions.
