# Authentification avec token

Traditionnellement lorsqu'un utilisateur était connecté sur un serveur on créait une session qu'on enregistrait sur le serveur, et on renvoyait un cookie à l'utilisateur pour vérifier son authentification, et pour éventuellement y stocker des informations.

Ce type de sécurité ne suffit plus pour des serveurs modernes surtout dans le contexte des appareils mobiles. Nous allons préférer la technique des tokens.

Avec ce type d'authentification l'utilisateur va recevoir un token encodé de l'application, et chaque requête client/serveur sera liée à ce token. Le serveur vérifiera lors des échanges client/serveur la validité de ce token.

L'avantage d'un token est qu'il peut contenir des informations, et que si on tente de le modifier sans la clé secrète, il devient alors invalide.

## Installation de JWT (json web token)

```bash
npm install --save jsonwebtoken
```

On l'importe dans l'application classiquement :

```js
import jwt from 'jsonwebtoken';
```

## Encodage d'un nouveau token

Le code suivant crée un nouveau token contenant des informations

```js
const token = jwt.sign(  
    { userId: 123 , role: "Admin"}, // informations utilisateur 
    'MA_PHRASE_SECRETE', // valable en développement, il faudra fournir lors de la production une chaîne plus longue
    { expiresIn: '24h' }   // validité temps
);
```

Une fois généré, on peut renvoyer le token au client :

```js
res.status(200).json(token);
```

Le client ne disposant pas de la clé secrète, s'il tente de modifier les informations présentes dans son token, il le rendra de fait invalide car la signature ne correspondra plus.

Lorsque le client refait une requête sur l'application, on doit maintenant vérifier ce token :

```js
// on récupère le token stocké dans la session
const token = req.session.token;

try {
    const verifToken = jwt.verify(token, 'MA_PHRASE_SECRETE');

    console.log(verifToken, 'is valid!');
}
catch (err) {
    console.log('Error verifying token …', err.message);
}
```

## 04 Exercice auth token

Vous allez "simuler" une authentification en partant du modèle Express **04_auth_token**. Nous aurons 3 routes 

- `/getToken` 
- `/clear` 
- `/securedRoute`

Toutes les routes se géreront en JSON uniquement. Pas de vue. Nous souhaitons tester ici l'authentification.

1. Définissez dans les variables d'environnement une clé secrète APP_SECRET qui servira à générer et vérifier les tokens.

2. Écrivez la route `/getToken` pour créer un nouveau token et mettez-le en session (vous utiliserez `express-session` **sans** MongoDB), puis renvoyez ce token au client.
Le token doit contenir les informations suivantes :
    - Un `userId` (vous pouvez le générer en vous servant de la date du jour)
    - Un `email` (celui que vous voulez)
    - Un `role` avec la valeur `Admin`

3. Écrivez la route `/clear` qui effacera la session (et donc le token) et qui renverra un message de confirmation à l'utilisateur. Renseignez-vous sur la documentation d'**express-connect** pour savoir comment effacer une session.

4. Écrivez un middleware (que vous placerez ensuite sur `/securedRoute`). Le middleware devra vérifier 2 choses :
    - Si la session existe et qu'il y a un token dedans
    - Si le token dans la session est bel et bien valide
