const tournamentService = require('../services/tournament.service');

exports.saveTournament = async (req, res) => {
    const { id_stand,lieu, participants_max, prix_entree,  nom_tournoi, description_tournoi } = req.body;
    const image_path = req.file ? `/images/tournaments/${req.file.filename}` : null;


    await tournamentService.createTournament(
        id_stand, lieu, participants_max, prix_entree,  nom_tournoi, description_tournoi, image_path,
        (error, data) => {
            if (error) {
                return res.status(500).send("Erreur lors de la création du tournoi.");
            }
            return res.status(200).send(data);
        }
    );
}

exports.deleteTournament = async (req, res) => {
    const id = req.params.id;
    await tournamentService.deleteTournament(id, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.getTournamentById = async (req, res) => {
    const id = req.params.id;
    const tournament = await tournamentService.fetchSpecificTournament(id);
    if (!tournament) {
        return res.status(404).send("Tournoi non trouvé");
    }
    return res.status(200).send(tournament);
}

exports.getTournaments = async (req, res) => {
    const tournaments = await tournamentService.fetchTournaments();
    return res.status(200).send(tournaments);
}

exports.fetchEdition = async (req, res) => {
    const idTournoi = req.params.id;
    const edition = await tournamentService.fetchEditions(idTournoi)
    if (!edition) {
        return res.status(404).send("Edition non trouvée");
    }
    return res.status(200).send(edition);
}

exports.updateTournament = async (req, res) => {
    const id = req.params.id;
    const image_path = req.file ? `/images/tournaments/${req.file.filename}` : null;
    const { nom_tournoi, description_tournoi } = req.body;
    await tournamentService.updateTournament(id,  nom_tournoi, description_tournoi, image_path, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.saveEdition = async (req, res) => {
    const { id_tournoi, capacite, date_edition } = req.body;
    await tournamentService.addEdition(id_tournoi, capacite, date_edition, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur lors de la création de l'édition.");
        }
        return res.status(200).send(data);
    });
}

exports.getAllEditions = async (req, res) => {
    const editions = await tournamentService.getAllEditions();
    return res.status(200).send(editions);
}

