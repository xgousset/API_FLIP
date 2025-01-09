const gameService = require('../services/games.service');

exports.getGames = async (req, res) => {
    try {
        const games = await gameService.fetchGames();
        return res.status(200).send(games);
    } catch (error) {
        console.error("Error fetching games:", error);
        return res.status(500).send("Erreur");
    }
}


exports.getGameById = async (req, res) => {
    const id = req.params.id;
    try {
        const game = await gameService.fetchSpecificGame(id);
        if (!game) {
            return res.status(404).send("Jeu non trouvé");
        }
        return res.status(200).send(game);
    } catch (error) {
        console.error("Error fetching game by ID:", error);
        return res.status(500).send("Erreur");
    }
}

exports.createGame = async (req, res) => {
    const { nom_produit, description_produit, prix_produit, stocks, nbJoueursMin, nbJoueursMax, ageLimite } = req.body;
    try {
        const game = await gameService.createGame(nom_produit, description_produit, prix_produit, stocks, nbJoueursMin, nbJoueursMax, ageLimite);
        if (!game) {
            return res.status(400).send("Erreur lors de la création du jeu");
        }
        return res.status(201).send(game);
    } catch (error) {
        console.error("Error creating game:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updateGame = async (req, res) => {
    const id = req.params.id;
    const { nom_produit, description_produit, prix_produit, stocks, nbJoueursMin, nbJoueursMax, ageLimite } = req.body;
    try {
        const game = await gameService.updateGame(id, nom_produit, description_produit, prix_produit, stocks, nbJoueursMin, nbJoueursMax, ageLimite);
        if (!game) {
            return res.status(400).send("Erreur lors de la mise à jour du jeu");
        }
        return res.status(200).send(game);
    } catch (error) {
        console.error("Error updating game:", error);
        return res.status(500).send("Erreur");
    }
}

exports.deleteGame = async (req, res) => {
    const id = req.params.id;
    try {
        const game = await gameService.deleteGame(id);
        if (!game) {
            return res.status(404).send("Jeu non trouvé");
        }
        return res.status(200).send("Jeu supprimé");
    } catch (error) {
        console.error("Error deleting game:", error);
        return res.status(500).send("Erreur");
    }
}

