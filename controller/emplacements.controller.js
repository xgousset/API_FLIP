const emplacementServices = require('../services/emplacements.service');

exports.getEmplacements = async (req, res) => {
    try {
        const emplacements = await emplacementServices.fetchEmplacements();
        return res.status(200).send(emplacements);
    } catch (error) {
        console.error("Error fetching emplacements:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getEmplacementById = async (req, res) => {
    const id = req.params.id;
    try {
        const emplacement = await emplacementServices.fetchSpecificEmplacement(id);
        if (!emplacement) {
            return res.status(404).send("Emplacement non trouvé");
        }
        return res.status(200).send(emplacement);
    } catch (error) {
        console.error("Error fetching emplacement by ID:", error);
        return res.status(500).send("Erreur");
    }
}

exports.checkAvailability = async (req, res) => {
    const id = req.params.id;
    try {
        const availability = await emplacementServices.checkAvailability(id);
        return res.status(200).send(availability);
    } catch (error) {
        console.error("Error fetching availability:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updateAvailability = async (req, res) => {
    const id = req.params.id;
    try {
        const availability = await emplacementServices.updateAvailability(id);
        return res.status(200).send(availability);
    } catch (error) {
        console.error("Error updating availability:", error);
        return res.status(500).send("Erreur");
    }
}

