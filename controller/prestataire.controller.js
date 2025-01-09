const prestataireService = require('../services/prestataire.service');

exports.savePrestataire = (req, res) => {
    const {nom, type,emplacement,description} = req.body;
    console.log(nom, type,emplacement,description);
    try {
        const data = prestataireService.createPrestataire(nom, type,emplacement,description);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error creating prestataire:", error);
        return res.status(500).send("Erreur");
    }

}

exports.deletePrestataire = (req, res) => {
    const id = req.params.id;
    try {
        const data = prestataireService.deletePrestataire(id);
        if (!data) {
            return res.status(404).send("Prestataire non trouvé");
        }
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error deleting prestataire:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getPrestataireById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prestataireService.fetchSpecificPrestataire(id);
        if (!data) {
            return res.status(404).send("Prestataire non trouvé");
        }
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching prestataire:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getPrestataires = async (req, res) => {
    try {
        const prestataires = await prestataireService.fetchPrestataires();
        return res.status(200).send(prestataires);
    } catch (error) {
        console.error("Error fetching prestataires:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updatePrestataire = (req, res) => {
    const id = req.params.id;
    const {nom,type,emplacement, description} = req.body;
    try{
        const data = prestataireService.updatePrestataire(id, nom, type, emplacement, description);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error updating prestataire:", error);
        return res.status(500).send("Erreur");
    }
}
