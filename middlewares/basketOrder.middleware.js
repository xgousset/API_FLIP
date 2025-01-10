const validateBasketOrder = (req, res, next) => {
    const { id_produit, quantite } = req.body;

    if (!id_produit || typeof id_produit !== 'number') {
        return res.status(400).send("Invalid or missing 'id_produit'");
    }

    if (!quantite || typeof quantite !== 'number' || quantite <= 0) {
        return res.status(400).send("Invalid or missing 'quantite'");
    }

    next();
};

module.exports = {
    validateBasketOrder
};