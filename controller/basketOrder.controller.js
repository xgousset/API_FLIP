const basketOrderService = require('../services/basketOrder.service');

exports.getBasket = async (req, res) => {
    try {
        const baskets = await basketOrderService.getBasket(); // Remplace fetchBasket par getBasket
        res.status(200).json(baskets);
    } catch (error) {
        console.error('Error fetching basket:', error);
        res.status(500).json({ error: 'Failed to fetch baskets' });
    }
};

exports.getBasketById = async (req, res) => {
    const id = req.params.id;
    try {
        const basket = await basketOrderService.getBasketById(id);
        if (!basket) {
            return res.status(404).send("Panier non trouvé");
        }
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error fetching basket by ID:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.createBasket = async (req, res) => {
    const { id_utilisateur, type } = req.body;
    try {
        const basket = await basketOrderService.createBasket({id_utilisateur, type});
        return res.status(201).send(basket);
    } catch (error) {
        console.error("Error creating basket:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.deleteBasket = async (req, res) => {
    const id = req.params.id;
    try {
        const basket = await basketOrderService.deleteBasket(id);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error deleting basket:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.addProductToBasket = async (req, res) => {
    const { id_user, id_produit, quantite } = req.body;
    try {
        const basket = await basketOrderService.addProductToBasket(id_produit,id_user, quantite);
        return res.status(201).send(basket);
    } catch (error) {
        console.error("Error adding product to basket:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.removeProductFromBasket = async (req, res) => {
    const { id_panier, id_produit, quantite } = req.body;
    try {
        const basket = await basketOrderService.removeProductFromBasket(id_panier, id_produit, quantite);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error removing product from basket:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.updateAmmountOfInBasket = async (req, res) => {
    const { id_panier, id_produit, quantite } = req.body;
    try {
        const basket = await basketOrderService.updateAmmountOfInBasket(id_panier, id_produit, quantite);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error updating product quantity:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.fetchUserHistoric = async (req, res) => {
    const id = req.params.id_utilisateur;
    try {
        const historic = await basketOrderService.fetchUserHistoric(id);
        return res.status(200).send(historic);
    } catch (error) {
        console.error("Error fetching user historic:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.fetchSpecificOrderInHistoric = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await basketOrderService.fetchSpecificOrderInHistoric(id);
        if (!order) {
            return res.status(404).send("Commande non trouvée");
        }
        return res.status(200).send(order);
    } catch (error) {
        console.error("Error fetching specific order:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.sendBasketToHistoric = async (req, res) => {
    const id = req.params.id;
    try {
        const historic = await basketOrderService.sendBasketToHistoric(id);
        return res.status(201).send(historic);
    } catch (error) {
        console.error("Error sending basket to historic:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.getBasketByUserId = async (req, res) => {
    const id = req.params.id_utilisateur;
    try {
        const basket = await basketOrderService.getBasketByUserId(id);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error fetching basket by user ID:", error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.getBasketContent = async (req, res) => {
    const id = req.params.id_panier;
    try {
        const content = await basketOrderService.fetchBasketContent(id);
        return res.status(200).send(content);
    } catch (error) {
        console.error("Error fetching basket content:", error);
        return res.status(500).send("Erreur serveur");
    }
}