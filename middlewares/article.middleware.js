const Validator = require('validator');
exports.validateArticle = (req, res, next) => {
    const { titre, contenu } = req.body;
    if (!titre || !contenu) {
        return res.status(400).send("Titre et contenu sont obligatoires");
    }
    next();
}