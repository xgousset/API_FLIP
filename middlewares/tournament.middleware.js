const validator = require('validator');

exports.validateTournament = (req, res, next) => {
    const { nom, description } = req.body;
    if (!nom || !description) {
        return res.status(400).send("Nom et description sont obligatoires");
    }
    if (capacitee <4 ){
        return res.status(400).send("Capacitee doit etre superieur a 4");
    }
    next();
}