export default function parite(req, res, next) {
  console.log(req.params.number);
  const number = Number(req.params.number);

  console.log(number);

  if (Number.isNaN(number)) {
    return res.status(500).send("Erreur interne!");
  }

  if (number % 2 === 0) {
    // Créer la propriété 'message' dans l'objet de request 'req'
    req.message = "Le nombre est pair !";
  } else {
    req.message = "Le nombre est impair !";
  }

  next();
}
