const basketOrderService = require('../services/basketOrder.service');

exports.getBasket = async (req, res) => {
    try {
        const basket = await basketOrderService.fetchBasket();
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error fetching basket:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getBasketById = async (req, res) => {
    const id = req.params.id;
    try {
        const basket = await basketOrderService.fetchSpecificBasket(id);
        if (!basket) {
            return res.status(404).send("Panier non trouvé");
        }
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error fetching basket by ID:", error);
        return res.status(500).send("Erreur");
    }
}


exports.createBasket = async (req, res) => {
    const id = req.params.id;
    try {
        const basket = await basketOrderService.createBasket(id);
        return res.status(201).send(basket);
    } catch (error) {
        console.error("Error creating basket:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updateBasketValue = async (req, res) => {
    const id = req.params.id;
    try {
        const basket = await basketOrderService.updateBasketValue(id);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error updating basket value:", error);
        return res.status(500).send("Erreur");
    }
}


exports.getOrderFromBasket = async (req, res) => {
    try {
        const order = await basketOrderService.fetchOrderFromBasket();
        return res.status(200).send(order);
    } catch (error) {
        console.error("Error fetching order from basket:", error);
        return res.status(500).send("Erreur");
    }
}


exports.deleteBasket = async (req, res) => {
    const id = req.params.id;
    try {
        const basket = await basketOrderService.deleteBasket(id);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error deleting basket:", error);
        return res.status(500).send("Erreur");
    }
}


exports.addProductToBasket = async (req, res) => {
    const { id_produit, quantite } = req.body;
    try {
        const basket = await basketOrderService.addProductToBasket(id_produit, quantite);
        return res.status(201).send(basket);
    } catch (error) {
        console.error("Error adding product to basket:", error);
        return res.status(500).send("Erreur");
    }
}


exports.removeProductFromBasket = async (req, res) => {
    const { id_produit, quantite } = req.body;
    try {
        const basket = await basketOrderService.removeProductFromBasket(id_produit, quantite);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error removing product from basket:", error);
        return res.status(500).send("Erreur");
    }
}


exports.updateAmmountOfInBasket = async (req, res) => {
    const { id_produit, quantite } = req.body;
    try {
        const basket = await basketOrderService.updateAmmountOfInBasket(id_produit, quantite);
        return res.status(200).send(basket);
    } catch (error) {
        console.error("Error updating ammount of product in basket:", error);
        return res.status(500).send("Erreur");
    }
}

exports.fetchUserHistoric = async (req, res) => {
    const id = req.params.id_utilisateur;
    try {
        const historic = await basketOrderService.fetchUserHistoric(id);
        return res.status(200).send(historic);
    } catch (error) {
        console.error("Error fetching user historic:", error);
        return res.status(500).send("Erreur");
    }
}

exports.fetchSpecificOrderInHistoric = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await basketOrderService.fetchSpecificOrderInHistoric(id);
        if (!order) {
            return res.status(404).send("Commande non trouvée");
        }
        return res.status(200).send(order);
    } catch (error) {
        console.error("Error fetching specific order in historic:", error);
        return res.status(500).send("Erreur");
    }
}


exports.fetchAllHistoric = async (req, res) => {
    try {
        console.log("fetching all historic");
        const historic = await basketOrderService.fetchAllHistoric();
        return res.status(200).send(historic);
    } catch (error) {
        console.error("Error fetching all historic:", error);
        return res.status(500).send("Erreur");
    }
}

exports.sendBasketToHistoric = async (req, res) => {
    const id = req.params.id;
    try {
        const historic = await basketOrderService.sendBasketToHistoric(id);
        return res.status(201).send(historic);
    } catch (error) {
        console.error("Error sending basket to historic:", error);
        return res.status(500).send("Erreur");
    }
}