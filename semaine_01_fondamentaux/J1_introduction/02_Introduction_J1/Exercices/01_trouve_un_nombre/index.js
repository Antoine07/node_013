let count = 0;

const searchNumber =  Math.floor( Math.random() * 100 ) + 1; ;

console.log(
  "Vous devez commencer le jeu choisissez un nombre compris entre 1 à 100"
);

console.log(searchNumber);

process.stdin.on("data", (chunk) => {
  const number = parseInt(chunk);

  if (isNaN(number) === true) {
    console.log("ce n'est pas un nombre");
  }

  if (count > 5) {
    console.log(`Vous avez dépasser les ${5} tentatives`);
    process.exit(0);
  }

  count++;

  if (number > searchNumber) {
    console.log(`Le nombre est plus petit que ${number}`);
  } else if (number < searchNumber) {
    console.log(`Le nombre est plus grand que ${number}`);
  } else {
    console.log(
      `Vous avez gagnez en ${count}, c'était bien le nombre ${searchNumber}`
    );
    process.exit(0);
  }
});
