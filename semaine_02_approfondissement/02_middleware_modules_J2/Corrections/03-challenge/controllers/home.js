export default function home(req, res) {

  let message = '';
  if (req.session.message) {
    message = req.session.message;
    delete req.session.message;
  }

  res.send(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Hello Express App!</title>
        <link rel="stylesheet" href="/css/styles.css" type="text/css" />
      </head>
      <body>
        <h1>Hello Express App!</h1>

        ${message ? `<p>${message}</p>` : ''}

        <form action="/login" method="post">
          <div>
            Login : <input type="text" name="login" />
          </div>
          <div>
            Mot de : <input type="password" name="password" />
          </div>
          <div>
            <button type="submit">Connexion</button>
          </div>
        </form>
      </body>
    </html>`
  );
};
