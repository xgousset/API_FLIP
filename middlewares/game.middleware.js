exports.validateGame = (req, res, next) => {
    const { name,  nbJoueursMin, nbJoueursMax, ageLimite } = req.body;
    if (!name ||  nbJoueursMin === undefined || nbJoueursMax === undefined || ageLimite === undefined) {
        return res.status(400).send("Nom, description, prix, stocks, nbJoueursMin, nbJoueursMax et ageLimite sont obligatoires");
    }
    if (typeof nbJoueursMin !== 'number' || nbJoueursMin < 0) {
        return res.status(400).send("nbJoueursMin doit être un nombre positif");
    }
    if (typeof nbJoueursMax !== 'number' || nbJoueursMax < 0) {
        return res.status(400).send("nbJoueursMax doit être un nombre positif");
    }
    if (nbJoueursMin > nbJoueursMax) {
        return res.status(400).send("nbJoueursMin doit être inférieur à nbJoueursMax");
    }
    if (typeof ageLimite !== 'number' || ageLimite < 0) {
        return res.status(400).send("ageLimite doit être un nombre positif");
    }
    next();
}