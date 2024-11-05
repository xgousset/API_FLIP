const prestataireService = require('../services/prestataire.service');

exports.savePrestataire = (req, res) => {
    const {nom, description} = req.body;
    prestataireService.createPrestataire(nom, description, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });

}

exports.deletePrestataire = (req, res) => {
    const id = req.params.id;
    prestataireService.deletePrestataire(id, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.getPrestataireById = (req, res) => {
    const id = req.params.id;
    const prestataire = prestataireService.fetchSpecificPrestataire(id);
    if (!prestataire) {
        return res.status(404).send("Prestataire non trouvé");
    }
    return res.status(200).send(prestataire);
}

exports.getPrestataires = (req, res) => {
    const prestataires = prestataireService.fetchPrestataires();
    return res.status(200).send(prestataires);
}

exports.updatePrestataire = (req, res) => {
    const id = req.params.id;
    const {nom, description} = req.body;
    prestataireService.updatePrestataire(id, nom, description, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}
