// chargement du module dans le script courant
const os = require('os');

// on récupère les informations de l'utilisateur
const { username } = os.userInfo();

// on récupère le nombre de CPU
const cpus = os.cpus().length;

console.log(
  `Cet ordinateur appartient à ${username} il a ${cpus} CPU.`
);