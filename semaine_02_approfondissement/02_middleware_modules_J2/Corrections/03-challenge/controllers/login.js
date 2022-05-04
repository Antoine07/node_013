
export default function login(req, res) {
    const { login, password } = req.body;

    if (login === 'admin' && password === 'secret') {
        req.session.auth = true;
        req.session.message = "Connecté avec succès !";
    }
    else {
        req.session.auth = false;
    }

    if (req.session.auth) {
        return res.redirect('/dashboard');
    }

    // Erreur de connexion
    req.session.message = "Attention vous n'êtes pas authentifié";
    res.redirect('/');

};
