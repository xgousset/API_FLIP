exports.validateType = (req, res, next) => {
    const { intitule, reserve, vente, anim } = req.body;
    if (!intitule || reserve === undefined || vente === undefined || anim === undefined) {
        return res.status(400).send("Intitulé, reserve, vente et anim sont obligatoires");
    }
    if (typeof reserve !== 'boolean') {
        return res.status(400).send("Reserve doit être un boolean");
    }
    if (typeof vente !== 'boolean') {
        return res.status(400).send("Vente doit être un boolean");
    }
    if (typeof anim !== 'boolean') {
        return res.status(400).send("Anim doit être un boolean");
    }
    next();
}