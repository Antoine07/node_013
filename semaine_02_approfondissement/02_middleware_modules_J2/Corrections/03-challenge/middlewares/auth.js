export default (req, res, next) => {
    if (req.session.auth === true) {
        return next();
    }

    req.session.message = "Attention, vous n'êtes pas connecté !";
    res.redirect("/");
}