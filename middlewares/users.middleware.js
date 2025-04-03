const validator = require('validator');


exports.validateUser = (req, res, next) => {
    const { nom, prenom, motDePasse } = req.body;
    console.log(req.body);
    console.log("nom", nom);
    console.log("prenom", prenom);
    // print le type de tous les champs
    console.log("type de nom", typeof nom);
    console.log("type de prenom", typeof prenom);
    console.log("type de password", typeof motDePasse);

    if (!nom || !prenom) {
        return res.status(400).send("Nom et prénom sont obligatoires");
    }

    if (!validator.isLength(nom, { min: 3 }) || !validator.isAlpha(nom, 'en-US', { ignore: ' ' })) {
        return res.status(400).send("Nom invalide");
    }

    if (!validator.isLength(prenom, { min: 3 }) || !validator.isAlpha(prenom, 'en-US', { ignore: ' ' })) {
        return res.status(400).send("Prenom invalide");
    }
    if (!validator.isLength(motDePasse, { min: 8 })) {
        return res.status(400).send("Mot de passe trop court");
    }
    next();
}
