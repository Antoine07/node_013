export default function parite(req, res, next) {
  const number = Number(req.params.number);

  if (Number.isNaN(number)) {
    return res.status(500).send("Erreur interne!");
  }

  if (number % 2 === 0) {
    message = "Le nombre est pair !";
  } else {
    message = "Le nombre est impair !";
  }

  next();
}
