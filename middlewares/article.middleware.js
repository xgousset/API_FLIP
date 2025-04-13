exports.validateArticle = (req, res, next) => {
    const { nom, stocks, prix } = req.body;
    if (!nom ||  stocks === undefined || prix === undefined) {
        return res.status(400).send("Nom, description, stocks, et prix sont obligatoires");
    }
    if (typeof stocks !== 'number' || stocks < 0) {
        return res.status(400).send("Stocks doit être un nombre positif");
    }
    if (typeof prix !== 'number' || prix < 0) {
        return res.status(400).send("Prix doit être un nombre positif");
    }
    next();
};