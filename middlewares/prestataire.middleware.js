const validator = require('validator');

exports.validatePrestataire = (req, res, next) => {
    const {nom, type, emplacement} = req.body;
    if (!nom || !type || !emplacement) {
        return res.status(400).send("Nom, type et emplacement sont obligatoires");
    }
    next();
}