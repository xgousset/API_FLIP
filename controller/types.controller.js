const typesController = require('../services/types.service');

exports.getTypes = async (req, res) => {
    try {
        const types = await typesController.fetchTypes();
        return res.status(200).send(types);
    } catch (error) {
        console.error("Error fetching types:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getTypeById = async (req, res) => {
    const id = req.params.id;
    try {
        const type = await typesController.fetchSpecificType(id);
        if (!type) {
            return res.status(404).send("Type non trouvé");
        }
        return res.status(200).send(type);
    } catch (error) {
        console.error("Error fetching type by ID:", error);
        return res.status(500).send("Erreur");
    }
}

exports.createType = async (req, res) => {
    const { intitule, reserve, vente, anim } = req.body;
    try {
        const type = await typesController.createType(intitule, reserve, vente, anim);
        return res.status(201).send(type);
    } catch (error) {
        console.error("Error creating type:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updateType = async (req, res) => {
    const id = req.params.id;
    const { intitule, reserve, vente, anim } = req.body;
    try {
        const type = await typesController.updateType(id, intitule, reserve, vente, anim);
        return res.status(200).send(type);
    } catch (error) {
        console.error("Error updating type:", error);
        return res.status(500).send("Erreur");
    }
}

exports.deleteType = async (req, res) => {
    const id = req.params.id;
    try {
        const type = await typesController.deleteType(id);
        return res.status(200).send(type);
    } catch (error) {
        console.error("Error deleting type:", error);
        return res.status(500).send("Erreur");
    }
}

