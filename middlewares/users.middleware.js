const validator = require('validator');


exports.validateUser = (req, res, next) => {
    const { nom, prenom } = req.body;
    if (!nom || !prenom) {
        return res.status(400).send("Nom et prénom sont obligatoires");
    }

    if (!validator.isLength(nom, { min: 3 }) || !validator.isAlpha(nom, 'en-US', { ignore: ' ' })) {
        return res.status(400).send("Nom invalide");
    }

    if (!validator.isLength(prenom, { min: 3 }) || !validator.isAlpha(prenom, 'en-US', { ignore: ' ' })) {
        return res.status(400).send("Prenom invalide");
    }
    next();
}
