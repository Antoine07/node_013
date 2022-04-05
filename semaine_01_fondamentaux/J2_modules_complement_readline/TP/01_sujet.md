
# Exercice mentions

1. Mise en place et traitement des données.

Installez un nouveau projet, définissez à l'aide des variables d'environnement les données suivantes :

- Une mention "assez bien" si sa moyenne est égale ou supérieure à 12/20 et inférieure à 14/20.
- Une mention "bien" si sa moyenne est au moins égale à 14/20 et inférieure à 16/20.
- Une mention "très bien" s'il obtient une moyenne égale ou supérieure à 16/20.

Créez le fichier .env à la racine de votre projet et utilisez process.env pour récupérez ces variables.

```txt
MENTION_AB= "assez bien"
```

Pour le lire en js avec l'objet process

```js
process.env.MENTION_AB
```

Structurez votre projet dans un dossier src/ et initialisez à l'aide de la commande 

```bash
npm init -y
```

Ajoutez la ligne suivante dans le package.json

```json
{
// ...
type : "module"

}

```

Créez un fichier utils.js dans lequel vous placerez la logique métier et importez-la dans le fichier principal : app.js. Utilisez les import/export en configurant votre package.json

Utilisez les étudiants suivants et définissez les labels "Assez bien", "Bien", "Très bien" et "Passable" des mentions de chaque étudiant

```js
const students = [
  { name: 'ALAN', note: '11', address: 'Paris', mention : null },
  { name: 'ALICE', note: '17', address: 'Paris', mention : null },
  { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
  { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
  { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
  { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
  { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
  { name: 'SONIA', note: '18', address: 'Paris', mention : null },
  { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
];
```

2. Créez une interface pour interroger les données de votre choix.
