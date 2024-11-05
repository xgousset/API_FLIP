const validator = require('validator');

exports.validatePrestataire = (req, res, next) => {
    const { nom, description } = req.body;
    if (!nom || !description) {
        return res.status(400).send("Nom et description sont obligatoires");
    }
    next();
}