
export default function dashboard(req, res) {
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
            <h1>Bienvenue sur le dashboard!</h1>

            ${message ? `<p>${message}</p>` : ''}
    
            <a href="/logout">Se déconnecter</a>
          </body>
        </html>`
      );
};
